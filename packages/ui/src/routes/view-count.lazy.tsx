import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useCopy } from '@/hooks/useCopy';
import { hono } from '@/lib/hono';
import { isPrivateUser } from '@/lib/private';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/view-count')({
  component: ViewCount,
});

function ViewCount() {
  const { user } = useAuthStore();
  const [newSpyName, setNewSpyName] = useState('');
  const copy = useCopy();

  const viewCountQuery = useQuery({
    queryKey: ['view-count'],
    queryFn: async () => {
      const response = await hono['view-count'].all.$get();
      if (!response.ok) throw new Error(response.statusText);
      return (await response.json()) as { name: string; count: number }[];
    },
    select: (data) => data.sort((a, b) => b.count - a.count),
    enabled: isPrivateUser(user),
  });

  if (user === undefined || viewCountQuery.isPending) return <div>Loading...</div>;
  if (viewCountQuery.error) return <div>Error: {viewCountQuery.error.message}</div>;
  if (user === null) throw new Error('User needs to be logged in');
  if (!isPrivateUser(user)) throw new Error('This user is not allowed to use this');

  const spyUrl = hono['view-count'].increment.$url();
  spyUrl.searchParams.set('name', 'view-count-dashboard');

  const newSpyUrl = hono['view-count'].increment.$url();
  newSpyUrl.searchParams.set('name', newSpyName.trim());

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        View Count
      </Typography>
      <div className="my-2 flex flex-col items-center gap-2">
        <Input
          placeholder="New spy name"
          value={newSpyName}
          onChange={(e) => {
            setNewSpyName(e.target.value);
          }}
        />
        {newSpyName && (
          <Button
            variant="link"
            onClick={() => {
              copy(newSpyUrl.toString());
            }}
          >
            {newSpyUrl.toString()}&nbsp;&nbsp;
            <CopyIcon size={14} />
          </Button>
        )}
      </div>
      <div className="max-w-4xl whitespace-pre-wrap p-4">
        {viewCountQuery.data.map(({ name, count }) => (
          <div key={name} className="flex items-center gap-2">
            <div className="flex-1 font-mono">{name}</div>
            <div className="font-bold">{count}</div>
          </div>
        ))}
      </div>
      <img alt="view-count-spy" src={spyUrl.toString()} className="hidden" />
    </PageWrapper>
  );
}
