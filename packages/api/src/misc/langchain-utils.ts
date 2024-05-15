import { ChatCloudflareWorkersAI } from '@langchain/cloudflare';
import type { Env } from 'api/env';

export const getStreamer = (env: Env, onToken: (token: string) => void | Promise<void>) =>
  new ChatCloudflareWorkersAI({
    streaming: true,
    cloudflareAccountId: env.CLOUDFLARE_ACCOUNT_ID,
    cloudflareApiToken: env.CLOUDFLARE_API_TOKEN,
    callbacks: [{ handleLLMNewToken: onToken }],
  });
