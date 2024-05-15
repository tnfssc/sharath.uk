import { ChatCloudflareWorkersAI } from '@langchain/cloudflare';
import type { Env } from 'api/env';

import type { TextGenerationModels } from './ai';

const getChatModel = (env: Env, model: TextGenerationModels = '@cf/meta/llama-3-8b-instruct') =>
  new ChatCloudflareWorkersAI({
    model,
    cloudflareAccountId: env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareApiToken: env.CLOUDFLARE_API_TOKEN,
  });

export default class LangChain {
  public static chatModel: ReturnType<typeof getChatModel>;

  public constructor(env: Env) {
    if (LangChain.initialized) return;

    LangChain.chatModel = getChatModel(env);

    LangChain.initialized = true;
  }

  private static initialized = false;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  private readonly _ = null;
}
