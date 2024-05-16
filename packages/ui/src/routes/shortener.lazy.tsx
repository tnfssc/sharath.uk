import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as v from 'valibot';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/ui/typography';
import { env } from '@/env';
import { useCopy } from '@/hooks/useCopy';
import { hono } from '@/lib/hono';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/shortener')({
  component: Shortener,
});

const formSchema = v.object({
  url: v.string([v.url()]),
});

function Shortener() {
  const { user } = useAuthStore();
  const copy = useCopy();

  const [shortUrl, setShortUrl] = useState('');
  const form = useForm<v.Output<typeof formSchema>>({
    defaultValues: { url: '' },
    resolver: valibotResolver(formSchema),
  });

  const shortenMutation = useMutation({
    mutationKey: ['shortener'],
    mutationFn: async (url: string) => {
      const res = await hono.shortener.$post({ query: { url } });
      if (!res.ok) throw new Error(res.statusText);
      const data = (await res.json()) as { id: string };
      return data.id;
    },
  });

  const onSubmit = async ({ url }: v.Output<typeof formSchema>) => {
    setShortUrl('');
    const id = await shortenMutation.mutateAsync(url);
    const shortUrl = `${env.VITE_PUBLIC_URL}/s/${id}`;
    setShortUrl(shortUrl);
    copyAndToast(shortUrl);
  };

  const copyAndToast = (url = shortUrl) => {
    copy(url);
    toast.success(`Copied`);
  };

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        URL Shortener
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
          <Button variant="default" disabled={!user || !form.formState.isValid || shortenMutation.isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="max-w-4xl whitespace-pre-wrap p-4">
        {!user && 'You must be logged in to use this.'}
        {shortenMutation.isPending && !shortUrl && 'Loading...'}
        {shortUrl && (
          <Button
            variant="link"
            onClick={() => {
              copyAndToast();
            }}
          >
            {shortUrl}&nbsp;&nbsp;
            <CopyIcon size={14} />
          </Button>
        )}
      </div>
    </PageWrapper>
  );
}
