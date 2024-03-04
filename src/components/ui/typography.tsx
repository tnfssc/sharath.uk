import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
  },
});

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(({ className, variant, ...props }, ref) => {
  const Comp = variant ?? 'p';
  // @ts-expect-error - `Comp` is a string, but it's fine
  return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
});
Typography.displayName = 'Typography';

export { Typography, typographyVariants };
