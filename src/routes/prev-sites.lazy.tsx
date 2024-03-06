import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { PreviousSites } from '@/data/prev-sites';

export const Route = createLazyFileRoute('/prev-sites')({
  component: PrevSites,
});

function PrevSites() {
  return (
    <PageWrapper>
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-5">
        <a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href="/"
        >
          Mar 2024 - Present (v5)
        </a>
        <a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href={PreviousSites.v4}
        >
          Jan 2023 - Mar 2024 (v4)
        </a>
        <a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href={PreviousSites.v3}
        >
          Aug 2022 - Apr 2023 (v3)
        </a>
        <a
          className="w-52 b b-foreground bg-background p-2 text-center text-foreground transition-all active:scale-90 hover:scale-110 active:b-0 active:bg-foreground active:text-background"
          target="_blank"
          rel="noreferrer noopener"
          href={PreviousSites.v2}
        >
          Dec 2021 - Sep 2022 (v2)
        </a>
      </div>
    </PageWrapper>
  );
}
