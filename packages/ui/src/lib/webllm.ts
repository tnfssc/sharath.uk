import { CreateMLCEngine, type InitProgressCallback } from '@mlc-ai/web-llm';

const MODEL_ID = 'TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC-1k';

export const createEngine = (onProgress: InitProgressCallback) =>
  CreateMLCEngine(MODEL_ID, { initProgressCallback: onProgress });
