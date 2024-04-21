import { useAuthStore } from '@/store/auth';

import { hono } from './hono';

export const streamAI = async (signal?: AbortSignal) => {
  const res = await fetch(hono.aipoem.$url(), {
    signal,
    headers: {
      Authorization: `Bearer ${(await useAuthStore.getState().user?.getIdToken()) ?? ''}`,
    },
  });

  if (!res.ok || !res.body) {
    throw new Error('Failed to fetch AI response');
  }
  return res.body;
};

export class JSONDecoderStream extends TransformStream<string, string> {
  constructor() {
    let residual = '';
    let lastToken = '';
    let isFirstChunk = true;
    super({
      start() {
        residual = '';
      },
      transform(chunk, controller) {
        try {
          residual += chunk;

          let newlineIndex;
          while ((newlineIndex = residual.indexOf('\n')) !== -1) {
            let line = residual.substring(0, newlineIndex).trim();

            if (line.includes('[DONE]')) {
              controller.terminate();
              return;
            }

            if (line.startsWith('data: ')) {
              line = line.substring(6);

              const data = JSON.parse(line) as { response: string };
              if (data.response) {
                if (!lastToken.endsWith(data.response)) {
                  if (isFirstChunk) {
                    isFirstChunk = false;
                    data.response = data.response.trimStart();
                  }
                  controller.enqueue(data.response);
                  lastToken = data.response;
                }
              }
            }

            residual = residual.substring(newlineIndex + 1);
          }
        } catch (error) {
          controller.error(error);
        }
      },
      flush(controller) {
        if (residual) {
          try {
            residual = residual.trim();
            if (residual.startsWith('data: ')) {
              const line = residual.substring(6); // Remove "data: " prefix
              const data = JSON.parse(line) as { response: string };
              if (data.response) {
                if (!lastToken.endsWith(data.response)) {
                  controller.enqueue(data.response);
                  lastToken = data.response;
                }
              }
            }
          } catch (error) {
            // ignore
          }
        }
      },
    });
  }
}
