import { Skeleton } from '@/components/ui/skeleton';
import { useBool } from '@/hooks/useBool';

export interface ImageProps
  extends Omit<
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'onLoad' | 'onError'
  > {
  width: number;
  height: number;
  loader?: React.ReactNode;
  fallback?: React.ReactNode;
  containerProps?: Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>;
}

export const ImageErrored = ({ width, height }: { width: number; height: number }) => {
  return (
    <div style={{ width, height }}>
      <div className="h-full w-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};

export const ImageSkeleton = ({ width, height }: { width: number; height: number }) => {
  const widthAfterPadding = width - Math.min(8, width * 0.1);
  const heightAfterPadding = height - Math.min(8, height * 0.1);
  return <Skeleton style={{ width: widthAfterPadding, height: heightAfterPadding }} />;
};

export default function Image({
  width,
  height,
  fallback = <ImageErrored width={width} height={height} />,
  loader = <ImageSkeleton width={width} height={height} />,
  containerProps,
  alt,
  ...props
}: ImageProps) {
  const isImageLoaded = useBool(false);
  const isImageErrored = useBool(false);
  return (
    <div {...containerProps} style={{ width, height, ...containerProps?.style }}>
      {!isImageLoaded.value && loader}
      {isImageErrored.value && fallback}
      <img
        alt={alt}
        onLoad={isImageLoaded.set.true}
        onError={isImageErrored.set.true}
        {...props}
        style={{ display: isImageLoaded.value ? 'block' : 'none', ...props.style }}
      />
    </div>
  );
}
