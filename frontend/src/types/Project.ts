import { HintInstructionTypes } from "./hintBot";

export type MessageTypeAI = {
  hint_type: HintInstructionTypes;
  hint: string;
};
export type MessageType = {
  user: string;
  ai: MessageTypeAI[];
};

export type QuizType = {
  id: string;
  type: string;
  title: string;
  abstract: string;
  content: string;
  stdin?: string;
  answer?: string;
};
