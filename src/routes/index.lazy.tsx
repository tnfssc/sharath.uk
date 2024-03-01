import { createLazyFileRoute } from '@tanstack/react-router';

import { Meteors } from '@/components/ui/meteors';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="relative mt-[-58px] h-screen w-full flex items-center justify-center overflow-hidden rounded-md antialiased">
      <div className="relative z-10 mx-auto max-w-7xl w-full p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 from-gray to-foreground bg-gradient-to-b bg-clip-text text-center text-4xl text-transparent font-bold md:text-7xl">
          sharath.uk
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal">A personal website for Sharath</p>
      </div>
      <Meteors number={50} />
    </div>
  );
}
