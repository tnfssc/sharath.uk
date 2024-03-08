import type { Property } from 'csstype';

import { useAsset } from '@/hooks/useAsset';
import { cn } from '@/lib/utils';

export interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  aspectRatio: number;
  size?: Property.BackgroundSize;
}

export function Image({ src, aspectRatio, className, size = 'cover', children, ...props }: ImageProps) {
  const assetUrl = useAsset(src);

  return (
    <div
      {...props}
      style={{
        aspectRatio,
        backgroundImage: assetUrl ? `url(${assetUrl})` : undefined,
        backgroundSize: size,
        ...props.style,
      }}
      className={cn({ 'animate-pulse rounded-md bg-muted': !assetUrl }, className)}
    >
      {children}
    </div>
  );
}
