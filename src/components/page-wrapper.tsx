import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export function PageWrapper({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial={{ filter: "blur(100px)" }}
      animate={{ filter: "blur(0px)" }}
      className={cn('relative max-h-screen max-w-screen overflow-auto container', className)}
    >
      {children}
    </motion.div>
  );
}
