import { FileUpload, type FileUploadRootProps } from '@ark-ui/react';

import { Button } from './ui/button';
import { Typography } from './ui/typography';

export const Dropzone = (props: FileUploadRootProps & { onFileDrop?: (files: File[]) => void }) => {
  return (
    <FileUpload.Root
      maxFiles={1}
      accept={{
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
        'image/gif': ['.gif'],
        'video/mp4': ['.mp4'],
      }}
      maxFileSize={1024 * 1024 * 10}
      minFileSize={50}
      onFileAccept={(f) => {
        props.onFileDrop?.(f.files);
      }}
      {...props}
    >
      <FileUpload.Dropzone className="min-w-xs cursor-pointer b-1 rounded-2xl bg-foreground">
        <div className="m-2 flex flex-col rounded-xl from-red-700 to-blue-800 bg-gradient-to-rb px-20 py-14">
          <Typography variant="h2" className="mb-2 flex">
            Upload
            <div className="w-10 pt-1 text-end text-xs font-500">upto 10MB</div>
          </Typography>
          <Button>Choose</Button>
        </div>
      </FileUpload.Dropzone>
      <FileUpload.HiddenInput />
    </FileUpload.Root>
  );
};
