import { createLazyFileRoute } from '@tanstack/react-router';

import { Spotlight } from '@/components/ui/spotlight';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="bg-grid-white/[0.02] relative h-[40rem] w-full flex overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight className="left-0 -top-40 md:left-60 md:-top-20" fill="white" />
      <div className="relative z-10 mx-auto max-w-7xl w-full p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 from-neutral-50 to-neutral-400 bg-gradient-to-b bg-clip-text text-center text-4xl text-transparent font-bold md:text-7xl">
          Spotlight <br /> is the new trend.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base text-neutral-300 font-normal">
          Spotlight effect is a great way to draw attention to a specific part of the page. Here, we are drawing the
          attention towards the text section of the page. I don&apos;t know why but I&apos;m running out of copy.
        </p>
      </div>
    </div>
  );
}
