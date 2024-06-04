import { CallbackManagerForLLMRun } from '@langchain/core/callbacks/manager';
import type { BaseLanguageModelCallOptions } from '@langchain/core/language_models/base';
import { type BaseChatModelParams, SimpleChatModel } from '@langchain/core/language_models/chat_models';
import { AIMessageChunk, BaseMessage } from '@langchain/core/messages';
import { ChatGenerationChunk } from '@langchain/core/outputs';
import {
  type AppConfig,
  type ChatOptions,
  type InitProgressCallback,
  type MLCEngineInterface,
  WebWorkerMLCEngine,
  prebuiltAppConfig,
} from '@mlc-ai/web-llm';
import type { ChatCompletionMessageParam } from '@mlc-ai/web-llm/lib/openai_api_protocols';

export const isShaderF16Available = async () =>
  (await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' }))?.features.has('shader-f16');

export const modelList = prebuiltAppConfig.model_list.map((m) => m.model_id);

export interface WebLLMInputs extends BaseChatModelParams {
  appConfig?: AppConfig;
  chatOptions?: ChatOptions;
  temperature?: number;
  model: string;
}

export type WebLLMCallOptions = BaseLanguageModelCallOptions;

/**
 * To use this model you need to have the `@mlc-ai/web-llm` module installed.
 * This can be installed using `npm install -S @mlc-ai/web-llm`.
 *
 * You can see a list of available model records here:
 * https://github.com/mlc-ai/web-llm/blob/main/src/config.ts
 * @example
 * ```typescript
 * // Initialize the ChatWebLLM model with the model record.
 * const model = new ChatWebLLM({
 *   model: "Phi2-q4f32_1",
 *   chatOptions: {
 *     temperature: 0.5,
 *   },
 * });
 *
 * // Call the model with a message and await the response.
 * const response = await model.invoke([
 *   new HumanMessage({ content: "My name is John." }),
 * ]);
 * ```
 */
export class ChatWebLLM extends SimpleChatModel {
  static inputs: WebLLMInputs;

  protected engine: MLCEngineInterface;

  appConfig?: AppConfig;

  chatOptions?: ChatOptions;

  temperature?: number;

  model: string;

  static lc_name() {
    return 'ChatWebLLM';
  }

  constructor(inputs: WebLLMInputs) {
    super(inputs);
    this.appConfig = inputs.appConfig;
    this.chatOptions = inputs.chatOptions;
    this.model = inputs.model;
    this.temperature = inputs.temperature;
    this.engine = new WebWorkerMLCEngine(
      new Worker(new URL('./webllm.ts', import.meta.url), {
        type: 'module',
      }),
    );
  }

  _llmType() {
    return 'web-llm';
  }

  async initialize(progressCallback?: InitProgressCallback) {
    if (progressCallback !== undefined) {
      this.engine.setInitProgressCallback(progressCallback);
    }
    await this.reload(this.model, this.chatOptions, this.appConfig);
  }

  async reload(modelId: string, newChatOpts?: ChatOptions, newAppConfig?: AppConfig) {
    await this.engine.reload(modelId, newChatOpts, newAppConfig);
  }

  async *_streamResponseChunks(
    messages: BaseMessage[],
    options: this['ParsedCallOptions'],
    runManager?: CallbackManagerForLLMRun,
  ): AsyncGenerator<ChatGenerationChunk> {
    const messagesInput: ChatCompletionMessageParam[] = messages.map((message) => {
      if (typeof message.content !== 'string') {
        throw new Error('ChatWebLLM does not support non-string message content in sessions.');
      }
      const langChainType = message._getType();
      let role;
      if (langChainType === 'ai') {
        role = 'assistant' as const;
      } else if (langChainType === 'human') {
        role = 'user' as const;
      } else if (langChainType === 'system') {
        role = 'system' as const;
      } else {
        throw new Error('Function, tool, and generic messages are not supported.');
      }
      return {
        role,
        content: message.content,
      };
    });

    const stream = await this.engine.chat.completions.create({
      stream: true,
      messages: messagesInput,
      stop: options.stop,
      logprobs: true,
    });
    for await (const chunk of stream) {
      const text = chunk.choices[0].delta.content ?? '';
      yield new ChatGenerationChunk({
        text,
        message: new AIMessageChunk({
          content: text,
          additional_kwargs: {
            logprobs: chunk.choices[0].logprobs,
            finish_reason: chunk.choices[0].finish_reason,
          },
        }),
      });
      await runManager?.handleLLMNewToken(text);
    }
  }

  async _call(
    messages: BaseMessage[],
    options: this['ParsedCallOptions'],
    runManager?: CallbackManagerForLLMRun,
  ): Promise<string> {
    const chunks = [];
    for await (const chunk of this._streamResponseChunks(messages, options, runManager)) {
      chunks.push(chunk.text);
    }
    return chunks.join('');
  }
}
