import { createLazyFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

import Covid19TrackerImage from '@/assets/images/covid19tracker.jpeg?w=960&image';
import DirectionsImage from '@/assets/images/directions.jpeg?w=960&image';
import GitHubImage from '@/assets/images/github.jpeg?w=960&image';
import HtOSImage from '@/assets/images/htos1.jpeg?w=960&image';
import OCSImage from '@/assets/images/ocs.jpeg?w=960&image';
import T3PImage from '@/assets/images/t3p.jpeg?w=960&image';
import { Image } from '@/components/image';
import { PageWrapper } from '@/components/page-wrapper';
import { Typography } from '@/components/ui/typography';
import { useHover } from '@/hooks/useHover';

export const Route = createLazyFileRoute('/about-developer')({
  component: AboutDeveloper,
});

const GridItem = (item: (typeof items)[0]) => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);
  return (
    <motion.div key={item.title} className="relative h-64 max-w-128 min-w-64 w-full rounded-2">
      <a href={item.link} target="_blank" rel="noreferrer noopener">
        <Image src={item.thumbnail} aspectRatio={item.aspectRatio} className="h-full w-full rounded-2">
          <motion.div
            ref={ref}
            className="h-full w-full rounded-2"
            style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0))' }}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          >
            <AnimatePresence>
              <Typography variant="h3" className="p-2 text-white">
                {item.title}
              </Typography>
              {isHovered && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <Typography variant="p" className="w-full">
                    {item.description}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Image>
      </a>
    </motion.div>
  );
};

function AboutDeveloper() {
  return (
    <PageWrapper className='pb-24'>
      <Typography variant="h1" className="my-8 w-full text-center">
        Developer
      </Typography>
      <div className="grid grid-cols-1 place-items-center gap-2 p-2 lg:grid-cols-3">{items.map(GridItem)}</div>
    </PageWrapper>
  );
}

const items = [
  {
    title: 'Office of Career Services',
    link: 'https://ocs.iith.ac.in/',
    thumbnail: OCSImage,
    aspectRatio: 2128 / 1287,
    description: 'One-stop-shop for all the career services of IIT Hyderabad.',
  },
  {
    title: 'TicTacToe Pro',
    link: 'https://t3p.tnfssc.vercel.app/',
    thumbnail: T3PImage,
    aspectRatio: 2128 / 1284,
    description:
      'An original idea for a multiplayer Tic-Tac-Toe game, with a huge twist. It supports upto 6 players and an 8x8 grid.',
  },
  {
    title: 'htOS',
    // TODO: Change this link
    link: 'https://admin.htos.sharath.co.in/',
    thumbnail: HtOSImage,
    aspectRatio: 2128 / 2151,
    description: 'A Hostel Management System for IIT Hyderabad.',
  },
  {
    title: 'Directions',
    link: 'https://x.tnfssc.vercel.app/',
    thumbnail: DirectionsImage,
    aspectRatio: 2128 / 1284,
    description:
      'Turn by turn navigation for the web using Google Maps API. Had to shutdown because it was against their ToS.',
  },
  {
    title: 'covid19tracker (defunct)',
    link: 'https://covid19tracker.in/',
    thumbnail: Covid19TrackerImage,
    aspectRatio: 2128 / 1373,
    description:
      'A fork of covid19india.org, with a network traffic over 3 terabytes a month, millions http requests, this was my most popular project. Using just $20 a month.',
  },
  {
    title: 'And more...',
    link: 'https://github.com/tnfssc?tab=repositories',
    thumbnail: GitHubImage,
    aspectRatio: 2128 / 1373,
    description: 'You can find more things that I made on my GitHub account.',
  },
];
