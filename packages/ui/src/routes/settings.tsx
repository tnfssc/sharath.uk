import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/components/page-wrapper';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useQueryStream } from '@/hooks/useQueryStream';
import { useSettings } from '@/hooks/useSettings';
import { JSONDecoderStream, streamAI } from '@/lib/aipoem';
import { hono } from '@/lib/hono';
import { useAuthStore } from '@/store/auth';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

function Settings() {
  const settings = useSettings();

  const user = useAuthStore((s) => s.user);

  const imageQuery = useQuery({
    queryKey: ['poem-thumbnail'],
    queryFn: async () => {
      const res = await hono.poemthumbnail.$get();
      if (!res.ok) throw new Error('Failed to fetch image');
      const img = await res.blob();
      return URL.createObjectURL(img);
    },
    enabled: !!user,
  });

  const queryStream = useQueryStream({
    queryKey: ['ai-poem'],
    queryFn: async ({ signal }) =>
      (await streamAI(signal)).pipeThrough(new TextDecoderStream()).pipeThrough(new JSONDecoderStream()),
    enabled: !!user,
  });

  return (
    <PageWrapper>
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-3">
          <Switch id="meteors-switch" checked={settings.meteors} onCheckedChange={settings.setMeteors} />
          <Label htmlFor="meteors-switch">Meteors</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="gradient-switch" checked={settings.gradient} onCheckedChange={settings.setGradient} />
          <Label htmlFor="gradient-switch">Background</Label>
        </div>
        <p className="max-w-sm whitespace-pre-wrap text-center italic">
          {queryStream.data?.map((text, i) => <span key={i}>{text}</span>)}
        </p>
        {imageQuery.data && (
          <img width={200} height={200} src={imageQuery.data} alt="unknown" className="m-8 rounded" />
        )}
        {imageQuery.isLoading && (
          <div className="grid m-8 h-[200px] w-[200px] animate-pulse place-items-center rounded bg-secondary">
            Loading...
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
