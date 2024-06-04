import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as v from 'valibot';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Typography } from '@/components/ui/typography';
import { useBool } from '@/hooks/useBool';
import { useSettings } from '@/hooks/useSettings';
import { useAuthStore } from '@/store/auth';

const isWebGPUAvailable = !!navigator.gpu as boolean;

export const Route = createLazyFileRoute('/ask')({
  component: Chat,
});

const initializeFormSchema = v.object({ modelId: v.pipe(v.string(), v.nonEmpty()) });
const questionFormSchema = v.object({ question: v.pipe(v.string(), v.nonEmpty()) });

function Chat() {
  const settings = useSettings();
  const { user } = useAuthStore();

  const isStreaming = useBool(false);
  const modelListQuery = useQuery({
    queryKey: ['model-list'],
    queryFn: async () => {
      const { modelList, isShaderF16Available } = await import('@/lib/ChatWebLLM');
      if (await isShaderF16Available()) return modelList;
      return modelList.filter((m) => !m.includes('f16'));
    },
    enabled: !!user && isWebGPUAvailable,
  });
  const modelMutation = useMutation({
    mutationKey: ['webllm-model'],
    mutationFn: async (_modelId: string) => {
      const modelId = v.parse(v.string(), _modelId);
      const { ChatWebLLM } = await import('@/lib/ChatWebLLM');
      const model = new ChatWebLLM({ model: modelId });
      const toastId = toast.loading('Initializing model');
      try {
        await model.initialize(({ text }) => {
          const toastText = text.split('.')[0];
          toast.loading(toastText, { id: toastId });
        });
        toast.success('Model loaded', { id: toastId });
      } catch (e) {
        console.error(e);
        toast.error('Error loading model', { id: toastId });
      }
      return model;
    },
  });

  const [answer, setAnswer] = useState('');
  const initializeForm = useForm<v.InferOutput<typeof initializeFormSchema>>({
    defaultValues: { modelId: '' },
    resolver: valibotResolver(initializeFormSchema),
  });
  const questionForm = useForm<v.InferOutput<typeof questionFormSchema>>({
    defaultValues: { question: '' },
    resolver: valibotResolver(questionFormSchema),
  });

  const onSubmitQuestionForm = async ({ question }: v.InferOutput<typeof questionFormSchema>) => {
    if (!modelMutation.isSuccess) {
      toast.error('Model is not initialized');
      return;
    }
    const model = modelMutation.data;
    setAnswer('');
    isStreaming.set.true();
    const chunks = await model.stream(question);
    let text = '';
    for await (const chunk of chunks) {
      const token = chunk.content.toString();
      setAnswer((p) => p + token);
      text = text + token;
    }
    isStreaming.set.false();
    if (!text) toast.error('Some error occurred');
  };

  const onSubmitInitializeForm = ({ modelId }: v.InferOutput<typeof initializeFormSchema>) => {
    settings.setGradient(false);
    settings.setMeteors(false);
    modelMutation.mutate(modelId);
  };

  if (!isWebGPUAvailable)
    return (
      <PageWrapper className="flex flex-col items-center pb-24">
        <Typography variant="h1" className="my-8 w-full text-center">
          Your device does not support WebGPU
        </Typography>
      </PageWrapper>
    );

  return (
    <PageWrapper className="flex flex-col items-center pb-24">
      <Typography variant="h1" className="my-8 w-full text-center">
        Ask
      </Typography>
      <div className="max-w-md">
        <Form {...initializeForm}>
          <form
            onSubmit={(e) => void initializeForm.handleSubmit(onSubmitInitializeForm)(e)}
            className="my-1 max-w-md w-full flex items-center gap-2"
          >
            <FormField
              control={initializeForm.control}
              name="modelId"
              render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select
                      name={name}
                      disabled={modelListQuery.isPending || disabled}
                      value={value}
                      onValueChange={(value) => {
                        onChange({ target: { value } });
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder={modelListQuery.isPending ? 'Loading...' : 'Select a model'} />
                      </SelectTrigger>
                      <SelectContent className="h-[180px]" onBlur={onBlur} ref={ref}>
                        <SelectGroup>
                          <SelectLabel>Smallest models are at the top</SelectLabel>
                          {modelListQuery.data?.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-24" disabled={!user || !initializeForm.formState.isValid || modelMutation.isPending}>
              Initialize
            </Button>
          </form>
        </Form>
        <Form {...questionForm}>
          <form
            onSubmit={(e) => void questionForm.handleSubmit(onSubmitQuestionForm)(e)}
            className="my-1 max-w-md w-full flex items-center gap-2"
          >
            <FormField
              control={questionForm.control}
              name="question"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Why does water look blue?" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-24" disabled={!user || !questionForm.formState.isValid || !modelMutation.isSuccess}>
              ✨Ask&nbsp;&nbsp;&nbsp;
            </Button>
          </form>
        </Form>
      </div>
      <div className="max-w-4xl whitespace-pre-wrap p-4">
        {!user && 'You must be logged in to use this.'}
        {isStreaming.value && !answer && 'Loading...'}
        {answer.trim().slice(0, -1)}
      </div>
    </PageWrapper>
  );
}
