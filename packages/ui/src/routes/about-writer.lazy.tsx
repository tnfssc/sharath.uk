import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import type { PostsOrPages } from '@tryghost/content-api';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useRef } from 'react';

import ImageCompressionImage from '@/assets/images/imagecompression.jpg?w=640&h=358&image';
import { Image } from '@/components/image';
import { PageWrapper } from '@/components/page-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { useFocus } from '@/hooks/useFocus';
import { useHover } from '@/hooks/useHover';
import { hono } from '@/lib/hono';

export const Route = createLazyFileRoute('/about-writer')({
  component: AboutWriter,
});

interface Item {
  title: string;
  link: string;
  thumbnail: string;
  aspectRatio: number;
  description: string;
}

const GridItem = (item: Item) => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);
  const isFocussed = useFocus(ref);

  return (
    <motion.div className="relative h-64 max-w-128 min-w-64 w-full rounded-2">
      <a href={item.link} target="_blank" rel="noreferrer noopener">
        <Image src={item.thumbnail} aspectRatio={item.aspectRatio} className="h-full w-full rounded-2">
          <motion.div
            ref={ref}
            className="h-full w-full rounded-2"
            style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0))' }}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            whileFocus={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          >
            <AnimatePresence>
              <Typography variant="h3" className="p-2 text-white">
                {item.title}
              </Typography>
              {(isHovered || isFocussed) && (
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

function AboutWriter() {
  const latestPostsQuery = useQuery({
    queryKey: ['latest-posts', 3],
    queryFn: async () => {
      const res = await hono.ghost['latest-posts'].$get({ query: { limit: 3 } });
      const posts = (await res.json()) as PostsOrPages;
      return posts.map((post) => ({
        aspectRatio: 2128 / 1284,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        description: post.excerpt!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        link: post.url!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        thumbnail: post.feature_image!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        title: post.title!,
      }));
    },
  });
  const items = useMemo<Item[]>(
    () => [
      {
        title: 'Image Compression - A Trilogy',
        link: 'https://youtube.com/watch?v=fRS4W3BqgpQ',
        thumbnail: ImageCompressionImage,
        aspectRatio: 640 / 358,
        description: 'The past, present and future of image compression.',
      },
    ],
    [],
  );
  return (
    <PageWrapper className="pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        Writer
      </Typography>
      <div className="grid grid-cols-1 place-items-center gap-2 p-2 lg:grid-cols-2">
        {items.map((item) => (
          <GridItem key={item.title} {...item} />
        ))}
        {latestPostsQuery.isPending &&
          Array.from({ length: 3 }).map(() => (
            <Skeleton key={Math.random()} className="h-64 max-w-128 min-w-64 w-full rounded-2" />
          ))}
        {latestPostsQuery.data?.map((item) => <GridItem key={item.title} {...item} />)}
      </div>
    </PageWrapper>
  );
}
