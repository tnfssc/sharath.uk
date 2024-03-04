import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  return (
    <PageWrapper>
      <h1 className="scale-110 bg-opacity-50 from-gray to-foreground bg-gradient-to-b bg-clip-text text-center text-4xl text-transparent font-bold transition-transform md:text-7xl">
        About
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal">me</p>
    </PageWrapper>
  );
}
