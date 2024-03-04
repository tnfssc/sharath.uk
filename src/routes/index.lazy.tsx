import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <PageWrapper>
      <BackgroundGradientAnimation>
        <div className="absolute z-10 h-screen w-screen flex flex-col items-center justify-center">
          <h1 className="bg-opacity-50 from-gray to-foreground bg-gradient-to-b bg-clip-text text-center text-4xl text-transparent font-bold md:text-7xl">
            sharath.uk
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal">
            <a className="p-2 hover:underline" href="https://github.com/tnfssc" target="_blank" rel="noreferrer">
              github
            </a>
            <a
              className="p-2 hover:underline"
              href="https://www.linkedin.com/in/tnfssc/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin
            </a>
            <a
              className="p-2 hover:underline"
              href="https://www.youtube.com/channel/UCuB3HpVwVpNyaVxjr8k5Geg"
              target="_blank"
              rel="noreferrer"
            >
              youtube
            </a>
          </p>
        </div>
      </BackgroundGradientAnimation>
    </PageWrapper>
  );
}
