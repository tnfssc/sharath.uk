import type { FileUploadFileRejectDetails } from '@ark-ui/react';
import { useMutation } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { CopyIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Dropzone } from '@/components/dropzone';
import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useCopy } from '@/hooks/useCopy';
import { hono } from '@/lib/hono';
import { isPrivateUser } from '@/lib/private';
import { useAuthStore } from '@/store/auth';

export const Route = createLazyFileRoute('/upload-cdn')({
  component: UploadCdn,
});

function UploadCdn() {
  const { user } = useAuthStore();
  const copy = useCopy();

  const [cdnUrl, setCdnUrl] = useState('');

  const uploadCdnMutation = useMutation({
    mutationKey: ['upload-cdn'],
    mutationFn: async (file: File) => {
      setCdnUrl('');
      const fileExtension = file.name.split('.').pop();
      if (!fileExtension) throw new Error('File extension is not supported');
      const url = new URL(hono.cdn.$url());
      url.searchParams.set('ext', fileExtension);
      const token = await user?.getIdToken();
      if (!token) throw new Error('User is not logged in');
      const res = await fetch(url, {
        body: file,
        method: 'PUT',
        headers: { 'Content-Type': file.type, Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(res.statusText || 'Failed to upload');
      const data = await res.json<{ url: string }>();
      return data.url;
    },
    onSuccess(url) {
      setCdnUrl(url);
      copy(url);
      toast.success(`Copied`);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length !== 1) return;
      const file = acceptedFiles[0];
      uploadCdnMutation.mutate(file);
    },
    [uploadCdnMutation],
  );

  const onDropReject = useCallback(({ files }: FileUploadFileRejectDetails) => {
    if (files.length === 0) return;
    toast.error('Cannot upload this file');
  }, []);

  const copyAndToast = (url = cdnUrl) => {
    copy(url);
    toast.success(`Copied`);
  };

  if (user === undefined) return <div>Loading...</div>;
  if (user === null) throw new Error('User needs to be logged in');
  if (!isPrivateUser(user)) throw new Error('This user is not allowed to use this');

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        Upload to CDN
      </Typography>

      <Dropzone onFileDrop={onDrop} onFileReject={onDropReject} />

      <div className="max-w-4xl whitespace-pre-wrap p-4">
        {uploadCdnMutation.isPending && 'Loading...'}
        {!uploadCdnMutation.isPending && cdnUrl && (
          <Button
            variant="link"
            onClick={() => {
              copyAndToast();
            }}
          >
            {cdnUrl}&nbsp;&nbsp;
            <CopyIcon size={14} />
          </Button>
        )}
      </div>
    </PageWrapper>
  );
}
