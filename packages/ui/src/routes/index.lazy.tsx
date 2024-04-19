import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { useQueryStream } from '@/hooks/useQueryStream';
import { JSONDecoderStream, streamAI } from '@/lib/ai';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const user = useAuthStore((s) => s.user);
  const queryStream = useQueryStream({
    queryKey: ['ai-poem'],
    queryFn: async ({ signal }) =>
      (await streamAI(signal)).pipeThrough(new TextDecoderStream()).pipeThrough(new JSONDecoderStream()),
    enabled: !!user,
  });

  return (
    <PageWrapper>
      <div>
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
        <p className="max-w-sm whitespace-pre-wrap text-center italic">
          {queryStream.data?.map((text, i) => <span key={i}>{text}</span>)}
        </p>
      </div>
    </PageWrapper>
  );
}
