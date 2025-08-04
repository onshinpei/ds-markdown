export type StreamingType = 'ai-chat' | 'code-generation' | 'documentation';
export type AnswerType = 'thinking' | 'answer';

export interface StreamingItem {
  content: string;
  type: AnswerType;
}
