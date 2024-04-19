export interface WorkersAIPromptRequestBody {
  prompt: string;
  raw?: boolean;
}

export interface WorkersAIMessagesRequestBody {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

export interface WorkersAICommonRequestBody {
  max_tokens?: number;
}

export type Runner = <Streaming extends boolean | undefined>(
  model: string,
  options: (WorkersAIPromptRequestBody | WorkersAIMessagesRequestBody) &
    WorkersAICommonRequestBody &
    (Streaming extends true ? { stream: Streaming } : { stream?: Streaming }),
) => Promise<Streaming extends true ? ReadableStream<Uint8Array> : { response: string }>;
