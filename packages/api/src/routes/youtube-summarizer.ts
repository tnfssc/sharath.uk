import type { HonoEnv } from 'api/env';
import LangChain from 'api/lib/langchain';
import { getStreamer } from 'api/misc/langchain-utils';
import type { Handler } from 'hono';
import { stream } from 'hono/streaming';
import { loadSummarizationChain } from 'langchain/chains';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { z } from 'zod';

export const YoutubeSummarizerQuerySchema = z.object({ url: z.string().url().includes('https://').includes('youtu') });

export const YoutubeSummarizer: Handler<HonoEnv> = (c) => {
  c.header('Content-Encoding', 'none');

  return stream(c, async (stream) => {
    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();

    const { url } = YoutubeSummarizerQuerySchema.parse({ url: c.req.query('url') });
    const loader = YoutubeLoader.createFromUrl(url);
    const docs = await loader.loadAndSplit(new RecursiveCharacterTextSplitter());

    const encoder = new TextEncoder();
    const writer = writable.getWriter();
    const chain = loadSummarizationChain(LangChain.chatModel, {
      type: 'map_reduce',
      combineLLM: getStreamer(c.env, (token) => writer.write(encoder.encode(token))),
    });

    stream.pipe(readable).catch((e: unknown) => {
      console.error(e);
    });

    await chain.invoke({ input_documents: docs });
    await writer.close();
    await new Promise((r) => setTimeout(r, 1000));
  });
};
