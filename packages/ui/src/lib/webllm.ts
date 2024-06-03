import { MLCEngine, MLCEngineWorkerHandler } from '@mlc-ai/web-llm';

const engine = new MLCEngine();
let handler: MLCEngineWorkerHandler | undefined;

self.onmessage = (msg: MessageEvent) => {
  if (!handler) {
    handler = new MLCEngineWorkerHandler(engine);
  }
  handler.onmessage(msg);
};
