import { type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { typographyVariants } from '@/components/ui/typography/variants';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {}

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(({ className, variant, ...props }, ref) => {
  const Comp = variant ?? 'p';
  // @ts-expect-error - `Comp` is a string, but it's fine
  return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
});

Typography.displayName = 'Typography';
