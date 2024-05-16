import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import { Typography } from '@/components/ui/typography';
import { hono } from '@/lib/hono';

export const Route = createFileRoute('/s/$shortId')({
  component: ShortenerRedirect,
});

function ShortenerRedirect() {
  const { shortId } = Route.useParams();

  const expandUrlQuery = useQuery({
    queryKey: ['expand-url', shortId],
    queryFn: async () => {
      const res = await hono.shortener.$get({ query: { id: shortId } });
      if (!res.ok) throw new Error(res.statusText);
      const data = (await res.json()) as { url: string };
      return data.url;
    },
    enabled: !!shortId,
  });

  useEffect(() => {
    if (expandUrlQuery.isSuccess && expandUrlQuery.data) window.location.href = expandUrlQuery.data;
  }, [expandUrlQuery.data, expandUrlQuery.isSuccess]);

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        Redirecting...
      </Typography>
      <div className="max-w-4xl whitespace-pre-wrap p-4">provided by sharath</div>
    </PageWrapper>
  );
}
