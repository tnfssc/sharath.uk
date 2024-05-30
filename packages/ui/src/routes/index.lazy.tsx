import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const user = useAuthStore((s) => s.user);

  return (
    <PageWrapper>
      <div className="flex flex-col items-center">
        <h1 className="bg-opacity-50 from-foreground to-foreground/[0.8] bg-gradient-to-r bg-clip-text text-center text-4xl text-transparent font-bold md:text-7xl">
          sharath.uk
        </h1>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-base font-normal">
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
        {user && <p className="text-center italic">Hey {user.displayName}</p>}
      </div>
    </PageWrapper>
  );
}
