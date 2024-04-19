import { useWindowSize } from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';

export const Meteors = ({ number, className }: { number?: number; className?: string }) => {
  const meteors = new Array(number ?? 20).fill(true);
  const windowSize = useWindowSize();
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={`meteor ${idx.toString()}`}
          className={cn(
            'animate-forwards animate-meteor-effect absolute h-0.5 w-0.5 rounded-full bg-background shadow-background rotate-[215deg]',
            'before:content-empty before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[100px] before:h-[2px] before:bg-gradient-to-r before:from-gray before:to-transparent',
            className,
          )}
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * (windowSize.width - -windowSize.width) + -windowSize.width).toString()}px`,
            animationDelay: (Math.random() * (0.8 - 0.2) + 0.2).toString() + 's',
            animationDuration: Math.floor(Math.random() * (15 - 4) + 4).toString() + 's',
          }}
        />
      ))}
    </>
  );
};
