import { motion } from 'framer-motion';

export function PageWrapper({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      initial={{ filter: 'blur(10px)' }}
      animate={{ filter: 'blur(0px)' }}
      className="relative z-10 p-4 container"
    >
      {children}
    </motion.div>
  );
}
