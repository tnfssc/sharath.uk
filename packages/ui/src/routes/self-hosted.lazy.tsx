import { createLazyFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';

import ChatImg from '@/assets/images/chat.png?w=960&image';
import CodeImg from '@/assets/images/code.png?w=960&image';
import DpasteImg from '@/assets/images/dpaste.png?w=960&image';
import InvokeAIImg from '@/assets/images/invokeai.png?w=960&image';
import MeetImg from '@/assets/images/meet.png?w=960&image';
import MinioImg from '@/assets/images/minio.png?w=960&image';
import NetDataImg from '@/assets/images/netdata.png?w=960&image';
import OutlineImg from '@/assets/images/outline.png?w=960&image';
import PortainerImg from '@/assets/images/portainer.png?w=960&image';
import RustPadImg from '@/assets/images/rustpad.png?w=960&image';
import RxresumeImg from '@/assets/images/rxresume.png?w=960&image';
import StirlingPdf from '@/assets/images/stirling-pdf.png?w=960&image';
import UptimeKumaImg from '@/assets/images/uptimekuma.png?w=960&image';
import { Image } from '@/components/image';
import { PageWrapper } from '@/components/page-wrapper';
import { Typography } from '@/components/ui/typography';
import { useHover } from '@/hooks/useHover';

export const Route = createLazyFileRoute('/self-hosted')({
  component: SelfHosted,
});

const GridItem = (item: (typeof items)[0]) => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useHover(ref);
  return (
    <motion.div key={item.title} className="relative h-64 min-w-64 w-full rounded-2">
      <a href={item.link} target="_blank" rel="noreferrer noopener">
        <Image src={item.thumbnail} aspectRatio={item.aspectRatio} className="h-full w-full rounded-2">
          <motion.div
            ref={ref}
            className="h-full w-full rounded-2"
            style={{ backgroundImage: 'linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0))' }}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          >
            <AnimatePresence>
              <Typography variant="h3" className="px-4 pt-4 text-white">
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

function SelfHosted() {
  return (
    <PageWrapper className="pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        Self Hosted
      </Typography>
      <div className="grid grid-cols-1 place-items-center gap-2 p-2 lg:grid-cols-3">{items.map(GridItem)}</div>
    </PageWrapper>
  );
}

const items = [
  {
    title: 'Stirling PDF',
    link: 'https://pdf.sharath.uk/',
    thumbnail: StirlingPdf,
    aspectRatio: 960 / 540,
    description: 'Your hosted one-stop-shop for all your PDF needs.',
  },
  {
    title: 'LobeChat',
    link: 'https://lobechat.sharath.uk/',
    thumbnail: ChatImg,
    aspectRatio: 960 / 540,
    description: 'LobeChat instance connected to Ollama',
  },
  {
    title: 'InvokeAI',
    link: 'https://invokeai.sharath.uk/',
    thumbnail: InvokeAIImg,
    aspectRatio: 960 / 540,
    description: 'Self hosted instance of InvokeAI',
  },
  {
    title: 'Coder',
    link: 'https://coder.sharath.uk/',
    thumbnail: CodeImg,
    aspectRatio: 960 / 540,
    description: 'Coder is a web IDE management platform',
  },
  {
    title: 'DPaste',
    link: 'https://dpaste.sharath.uk/',
    thumbnail: DpasteImg,
    aspectRatio: 960 / 540,
    description: 'A pastebin service hosted on my hardware',
  },
  {
    title: 'Jitsi',
    link: 'https://meet.sharath.uk/',
    thumbnail: MeetImg,
    aspectRatio: 960 / 540,
    description: 'Self hosted instance of Jitsi',
  },
  {
    title: 'MinIO',
    link: 'https://minio.sharath.uk/',
    thumbnail: MinioImg,
    aspectRatio: 960 / 540,
    description: 'A cloud storage service',
  },
  {
    title: 'NetData',
    link: 'https://netdata.sharath.uk/',
    thumbnail: NetDataImg,
    aspectRatio: 960 / 540,
    description: 'Infrastructure monitoring tool',
  },
  {
    title: 'Outline',
    link: 'https://outline.sharath.uk/',
    thumbnail: OutlineImg,
    aspectRatio: 960 / 540,
    description: 'Note taking app. Like Notion',
  },
  {
    title: 'Portainer',
    link: 'https://portainer.sharath.uk/',
    thumbnail: PortainerImg,
    aspectRatio: 960 / 540,
    description: 'Container management solution for Docker Swarm',
  },
  {
    title: 'Rustpad',
    link: 'https://rustpad.sharath.uk/',
    thumbnail: RustPadImg,
    aspectRatio: 960 / 540,
    description: 'Realtime online collaborative text pad',
  },
  {
    title: 'RxResume',
    link: 'https://rxresume.sharath.uk/',
    thumbnail: RxresumeImg,
    aspectRatio: 960 / 540,
    description: 'A resume building platform with various templates',
  },
  {
    title: 'UptimeKuma',
    link: 'https://uptimekuma.sharath.uk/',
    thumbnail: UptimeKumaImg,
    aspectRatio: 960 / 540,
    description: 'Status page for all my services',
  },
].sort(() => Math.round(Math.random() * 2 - 1));
