"use server";

import admin from "@/firebase/firebase_admin";
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "../../verifyToken/route";
import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { ConstructHintInstructionForSpecificProblem, HintInstructionTypes, HintInstructions } from "../../../../types/hintBot";




export type AskHintBotRequestBody = {
  hint_type: HintInstructionTypes;
  question: string;
  problem: string;
  message_history: string;
};

export async function POST(request: NextRequest) {
  const user = await validateToken(request);
  if (user === null) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  try {
    const { problem, question, hint_type, message_history }: Partial<AskHintBotRequestBody> = await request.json();
    if (!problem || !question || !hint_type) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
    let templateMessage: string = ConstructHintInstructionForSpecificProblem(problem, hint_type);
    const chatModelName = process.env.OPENAI_CHAT_MODEL_NAME;
    if (!chatModelName) {
      throw new Error("env value OPENAI_CHAT_MODEL_NAME not defined in this server")
    }
    let model: ChatOpenAI = new ChatOpenAI({ model: chatModelName });
    let answer = await model.invoke([
      new SystemMessage({ content: templateMessage }),
      new AIMessage({ content: `会話履歴は以下の通りです: \n${message_history}` }),
      new HumanMessage({ content: question }),
    ]);
    return NextResponse.json(
      { answer: answer.content.toString() },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
}

export const string2UniqueNumber = (input: string) => {
  // シンプルなハッシュ関数を作成
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  // ハッシュ値をポジティブな数に変換
  return Math.abs(hash);
};
