import { useCallback, useState } from 'react';

import { useEffectOnce } from '@/hooks/useEffectOnce';

const Cache = new Map<string, string>();

export const useAsset = (url: string) => {
  const [assetUrl, setAssetUrl] = useState<string | null>(null);

  const getAsset = useCallback(() => {
    const fetchAsset = () =>
      new Promise<void>((resolve, reject) => {
        const cachedValue = Cache.get(url);
        if (cachedValue) {
          setAssetUrl(cachedValue);
          resolve();
          return;
        }
        fetch(url)
          .then((r) => r.blob())
          .then((blob) => {
            // read to base64
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result as string;
              Cache.set(url, base64);
              setAssetUrl(base64);
              resolve();
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
          .catch((e: unknown) => {
            if (e instanceof Error) reject(e);
            else reject(new Error('Failed to fetch asset'));
          });
      });

    void fetchAsset();
  }, [url]);

  useEffectOnce(() => {
    getAsset();
  });

  return assetUrl;
};
