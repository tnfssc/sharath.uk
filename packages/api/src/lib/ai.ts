import { workersEnvSchemaParse } from './workers';

export interface TextGenerationPromptRequestBody {
  prompt: string;
  raw?: boolean;
}

export interface TextGenerationMessagesRequestBody {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

export type TextGenerationModels = '@cf/meta/llama-3-8b-instruct';

export const TextGeneration = {
  run: async <Streaming extends true>(
    env: unknown,
    model: TextGenerationModels,
    options: (TextGenerationPromptRequestBody | TextGenerationMessagesRequestBody) & {
      max_tokens?: number;
    } & (Streaming extends true ? { stream: Streaming } : { stream?: Streaming }),
  ): Promise<Streaming extends true ? ReadableStream<Uint8Array> : { response: string }> => {
    const { AI } = workersEnvSchemaParse(env);
    const res = await AI.run(model, options);
    // @ts-expect-error - I am too lazy to fix this
    return res;
  },
};

export type ImageGenerationModels = '@cf/lykon/dreamshaper-8-lcm';

export interface ImageGenerationRequestBody {
  prompt: string;
  /**@description base64 string or binary array */
  image?: string | Uint8Array;
  /**@description base64 string or binary array */
  mask?: string | Uint8Array;
  num_steps?: number;
  strength?: number;
  guidance?: number;
}

export const ImageGeneration = {
  /**@returns {Promise<string>} base64 representation */
  run: async (env: unknown, model: ImageGenerationModels, options: ImageGenerationRequestBody): Promise<string> => {
    const { AI } = workersEnvSchemaParse(env);
    const res = await AI.run(model, options);
    // @ts-expect-error - I am too lazy to fix this
    return res;
  },
};
