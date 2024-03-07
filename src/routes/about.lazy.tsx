import { createLazyFileRoute } from '@tanstack/react-router';
import { ComputerIcon, JoystickIcon, PenIcon } from 'lucide-react';

import { useCS2Logo } from '@/assets/cs2';
import { useMediumLogo } from '@/assets/medium';
import { useReactLogo } from '@/assets/react';
import { PageWrapper } from '@/components/page-wrapper';
import SkillCard from '@/components/skill-card';
import { Typography } from '@/components/ui/typography';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  const cs2Logo = useCS2Logo();
  const reactLogo = useReactLogo();
  const mediumLogo = useMediumLogo();
  return (
    <PageWrapper>
      <Typography variant="h1" className="my-8 w-full text-center">
        About
      </Typography>
      <div className="grid grid-cols-1 max-w-5xl place-items-center gap-4 container lg:grid-cols-3">
        <SkillCard
          title={
            <span className="flex gap-2">
              <JoystickIcon /> Gamer
            </span>
          }
          description="I play a lot of Counter-Strike. I play story driven single player games too."
          image={
            <div style={{ width: 270, height: 148 }}>
              <img src={cs2Logo} alt="Counter-Strike 2" />
            </div>
          }
          to="/about-gamer"
        />
        <SkillCard
          title={
            <span className="flex gap-2">
              <ComputerIcon /> Developer
            </span>
          }
          description="I love to code and create useful applications."
          image={
            <div style={{ width: 270, height: 148 }} className="flex flex-col items-center justify-center">
              <div style={{ width: 108 }}>
                <img src={reactLogo} alt="React" />
              </div>
            </div>
          }
          to="/about-developer"
        />
        <SkillCard
          title={
            <span className="flex gap-2">
              <PenIcon /> Writer
            </span>
          }
          description="I write about my experiences and share my knowledge."
          image={
            <div style={{ width: 270, height: 148 }} className="flex flex-col items-center justify-center">
              <div style={{ width: 128 }}>
                <img src={mediumLogo} alt="Medium" />
              </div>
            </div>
          }
          to="/about-gamer"
        />
      </div>
    </PageWrapper>
  );
}
