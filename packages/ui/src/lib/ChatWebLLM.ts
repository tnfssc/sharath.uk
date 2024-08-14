import { prebuiltAppConfig } from '@mlc-ai/web-llm';

export const isShaderF16Available = async () =>
  (await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' }))?.features.has('shader-f16');

export const modelList = prebuiltAppConfig.model_list
  .sort((a, b) => (a.vram_required_MB ?? 0) - (b.vram_required_MB ?? 0))
  .map((m) => m.model_id);

export * from '@langchain/community/chat_models/webllm';
