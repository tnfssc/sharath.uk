import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export function PageWrapper({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial={{ filter: 'blur(10px)', height: 0, width: 0 }}
      animate={{ filter: 'blur(0px)', height: 'auto', width: 'auto' }}
      className={cn('relative max-h-screen max-w-screen overflow-auto container', className)}
    >
      {children}
    </motion.div>
  );
}
