import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { posthog } from 'posthog-js';
import { useEffect } from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import { Typography } from '@/components/ui/typography';
import { hono } from '@/lib/hono';
import { useAuthStore } from '@/store/auth';

export const Route = createFileRoute('/s/$shortId')({
  component: ShortenerRedirect,
});

function ShortenerRedirect() {
  const { shortId } = Route.useParams();
  const user = useAuthStore((a) => a.user);

  const expandUrlQuery = useQuery({
    queryKey: ['expand-url', shortId],
    queryFn: async () => {
      const res = await hono.shortener.$get({ query: { id: shortId } });
      if (!res.ok) throw new Error(res.statusText || 'Something went wrong');
      const data = (await res.json()) as { url: string };
      return data.url;
    },
    enabled: !!shortId,
  });

  useEffect(() => {
    if (expandUrlQuery.isSuccess && expandUrlQuery.data) {
      posthog.capture(
        'redirect_shortUrl',
        { to: expandUrlQuery.data, userId: user?.uid, userName: user?.displayName },
        { transport: 'sendBeacon' },
      );
      window.location.href = expandUrlQuery.data;
    }
  }, [expandUrlQuery, user]);

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        {!expandUrlQuery.isError ? 'Redirecting...' : 'Some error occurred while redirecting'}
      </Typography>
      <div className="max-w-4xl whitespace-pre-wrap p-4">
        checkout{' '}
        <Link to="/" className="hover:underline">
          sharath.uk
        </Link>{' '}
        sometime
      </div>
    </PageWrapper>
  );
}
