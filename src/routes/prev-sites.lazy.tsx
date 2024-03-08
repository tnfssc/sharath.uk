import { createLazyFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import { PageWrapper } from '@/components/page-wrapper';
import { PreviousSites } from '@/data/prev-sites';

export const Route = createLazyFileRoute('/prev-sites')({
  component: PrevSites,
});

function PrevSites() {
  return (
    <PageWrapper className='pb-24'>
      <div className="flex flex-col items-center justify-center gap-5">
        <motion.a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href="/"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.1, delay: 0.1, ease: 'easeIn' }}
        >
          Mar 2024 - Present (v5)
        </motion.a>
        <motion.a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href={PreviousSites.v4}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.1, delay: 0.2, ease: 'easeIn'  }}
        >
          Jan 2023 - Mar 2024 (v4)
        </motion.a>
        <motion.a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href={PreviousSites.v3}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.1, delay: 0.3, ease: 'easeIn'  }}
        >
          Aug 2022 - Apr 2023 (v3)
        </motion.a>
        <motion.a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href={PreviousSites.v2}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.1, delay: 0.4, ease: 'easeIn'  }}
        >
          Dec 2021 - Sep 2022 (v2)
        </motion.a>
      </div>
    </PageWrapper>
  );
}
