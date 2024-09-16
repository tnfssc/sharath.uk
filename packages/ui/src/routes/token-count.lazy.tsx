import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type Tiktoken, encoding_for_model } from 'tiktoken';

import { PageWrapper } from '@/components/page-wrapper';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { useDebounce } from '@/hooks/useDebounce';

export const Route = createLazyFileRoute('/token-count')({
  component: TokenCount,
});

function TokenCount() {
  const encodingGpt4o = useRef<Tiktoken>();

  useEffect(() => {
    encodingGpt4o.current = encoding_for_model('gpt-4o');

    return () => {
      encodingGpt4o.current?.free();
    };
  }, []);

  const [message, setMessage] = useState('');

  const debouncedMessage = useDebounce(message);

  const tokensGpt4o = useMemo(() => {
    if (!encodingGpt4o.current) return new Uint32Array();
    return encodingGpt4o.current.encode(debouncedMessage);
  }, [debouncedMessage]);

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        {tokensGpt4o.length ? (
          <span>
            GPT 4o - <span className="border rounded-full px-4 py-2">{tokensGpt4o.length.toString()}</span> tokens
          </span>
        ) : (
          'Token Count'
        )}
      </Typography>
      <Textarea
        className="min-h-80 min-w-80vw bg-background/69 text-lg font-mono"
        placeholder="Type your message here"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
    </PageWrapper>
  );
}
