export interface WorkersEnv {
  AI: { run: (model: string, options: unknown) => Promise<unknown> };
  CDN: { put: (key: string, file: ReadableStream) => Promise<unknown> };
}
export const workersEnvSchemaParse = (env: unknown): WorkersEnv => {
  const error = new Error('workersEnvSchemaParse failed');
  if (!env || typeof env !== 'object') throw error;

  if (!('AI' in env)) throw error;
  if (!env.AI || typeof env.AI !== 'object') throw error;
  if (!('run' in env.AI)) throw error;
  if (!env.AI.run || typeof env.AI.run !== 'function') throw error;

  if (!('CDN' in env)) throw error;
  if (!env.CDN || typeof env.CDN !== 'object') throw error;
  if (!('put' in env.CDN)) throw error;
  if (!env.CDN.put || typeof env.CDN.put !== 'function') throw error;

  return env as WorkersEnv;
};
