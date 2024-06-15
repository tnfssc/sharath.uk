import { workersEnvSchemaParse } from './workers';

export const Cdn = {
  put: async <Key extends string>(env: unknown, key: Key, file: ReadableStream): Promise<Key> => {
    const { CDN } = workersEnvSchemaParse(env);
    await CDN.put(key, file);
    return key;
  },
};
