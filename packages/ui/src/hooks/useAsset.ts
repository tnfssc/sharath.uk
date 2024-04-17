import { useCallback, useState } from 'react';

import { onMount } from '@/hooks/onMount';

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
          .catch(reject);
      });

    void fetchAsset();
  }, [url]);

  onMount(() => {
    getAsset();
  });

  return assetUrl;
};
