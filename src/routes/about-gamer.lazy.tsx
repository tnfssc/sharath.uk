import { createLazyFileRoute } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

import ChessImage from '@/assets/images/chess.jpg?w=480&h=270&format=webp&image';
import CounterStrike2Image from '@/assets/images/counter-strike-2.jpg?w=960&h=540&format=webp&image';
import HorizonImage from '@/assets/images/horizon.jpg?w=480&h=270&format=webp&image';
import LittleNightmaresImage from '@/assets/images/little-nightmares.jpg?w=480&h=270&format=webp&image';
import MinecraftImage from '@/assets/images/minecraft.jpg?w=480&h=270&format=webp&image';
import { Image } from '@/components/image';
import { PageWrapper } from '@/components/page-wrapper';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Typography } from '@/components/ui/typography';

export const Route = createLazyFileRoute('/about-gamer')({
  component: AboutGamer,
});

function AboutGamer() {
  return (
    <PageWrapper>
      <Typography variant="h1" className="my-8 w-full text-center">
        Gamer
      </Typography>
      <div className="grid place-items-center p-2 pt-4 sm:pt-8">
        <BentoGrid className="mx-auto max-w-4xl">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
            />
          ))}
        </BentoGrid>
      </div>
    </PageWrapper>
  );
}

const items = [
  {
    title: 'Chess.com',
    description: "I'm not a terrible player, but I'm not a great player either.",
    header: <Image src={ChessImage} aspectRatio={480 / 270} className="h-full min-h-32 rounded" />,
    icon: <ChevronRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Horizon: Zero Dawn',
    description: 'It is a beautiful game with a great story and fun gameplay.',
    header: <Image src={HorizonImage} aspectRatio={480 / 270} className="h-full min-h-32 rounded" />,
    icon: <ChevronRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Little Nightmares',
    description: 'A creepy game with a great atmosphere and fun puzzles.',
    header: <Image src={LittleNightmaresImage} aspectRatio={480 / 270} className="h-full min-h-32 rounded" />,
    icon: <ChevronRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Counter-Strike 2',
    description:
      "First person shooter with a great competitive scene. It's better than Valorant. I have been playing it for over 5 years with 3000+ hours in it.",
    header: <Image src={CounterStrike2Image} aspectRatio={960 / 540} className="h-full min-h-32 rounded" />,
    icon: <ChevronRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Minecraft',
    description: 'I play it with my friends. My old phone with Tailscale, Termux and PRoot is our server.',
    header: <Image src={MinecraftImage} aspectRatio={480 / 270} className="h-full min-h-32 rounded" />,
    icon: <ChevronRight className="h-4 w-4 text-neutral-500" />,
  },
];
