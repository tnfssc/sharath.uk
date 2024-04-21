import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { useQueryStream } from '@/hooks/useQueryStream';
import { JSONDecoderStream, streamAI } from '@/lib/aipoem';
import { hono } from '@/lib/hono';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const user = useAuthStore((s) => s.user);

  const imageQuery = useQuery({
    queryKey: ['poem-thumbnail'],
    queryFn: async () => {
      const img = await (await hono.poemthumbnail.$get()).blob();
      return URL.createObjectURL(img);
    },
  });

  const queryStream = useQueryStream({
    queryKey: ['ai-poem'],
    queryFn: async ({ signal }) =>
      (await streamAI(signal)).pipeThrough(new TextDecoderStream()).pipeThrough(new JSONDecoderStream()),
    enabled: !!user,
  });

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
        <p className="max-w-sm whitespace-pre-wrap text-center italic">
          {queryStream.data?.map((text, i) => <span key={i}>{text}</span>)}
        </p>
        {imageQuery.data && (
          <img width={200} height={200} src={imageQuery.data} alt="unknown" className="m-8 rounded" />
        )}
        {!imageQuery.data && (
          <div className="grid m-8 h-[200px] w-[200px] animate-pulse place-items-center rounded bg-secondary">
            Loading...
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
