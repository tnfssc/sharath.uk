import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { Typography } from '@/components/ui/typography';

export const Route = createLazyFileRoute('/about-developer')({
  component: AboutGamer,
});

function AboutGamer() {
  return (
    <PageWrapper>
      <Typography variant="h1" className="my-8 w-full text-center">
        Developer
      </Typography>
      {/*  */}
    </PageWrapper>
  );
}
