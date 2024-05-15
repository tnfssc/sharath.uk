import { valibotResolver } from '@hookform/resolvers/valibot';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as v from 'valibot';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { useBool } from '@/hooks/useBool';
import { hono } from '@/lib/hono';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/youtube-summarizer')({
  component: YoutubeSummarizer,
});

const formSchema = v.object({
  url: v.string([v.url(), v.includes('https://'), v.includes('youtu')]),
});

function YoutubeSummarizer() {
  const { user } = useAuthStore();

  const [summary, setSummary] = useState('');
  const isLoading = useBool(false);
  const form = useForm<v.Output<typeof formSchema>>({
    defaultValues: { url: '' },
    resolver: valibotResolver(formSchema),
  });

  const onSubmit = async ({ url }: v.Output<typeof formSchema>) => {
    setSummary('');
    isLoading.set.true();
    const endpoint = new URL(hono['youtube-summarizer'].$url());
    endpoint.searchParams.set('url', url);

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${(await user?.getIdToken()) ?? ''}` },
    });
    isLoading.set.false();
    if (!res.ok || !res.body) return toast.error('Failed to summarize the video');

    const readableStream = res.body;
    const decoder = new TextDecoder();
    const writeableStream = new WritableStream<Uint8Array>({
      write: (chunk) => {
        setSummary((p) => p + decoder.decode(chunk));
      },
    });

    await readableStream.pipeTo(writeableStream);
  };

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        Youtube Summarizer
      </Typography>
      <Form {...form}>
        <form onSubmit={(e) => void form.handleSubmit(onSubmit)(e)} className="max-w-lg w-full flex items-center gap-2">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="https://youtu.be/dQw4w9WgXcQ" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="default" disabled={!form.formState.isValid || isLoading.value}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="max-w-4xl whitespace-pre-wrap p-4">{summary.trim().slice(0, -1)}</div>
    </PageWrapper>
  );
}
