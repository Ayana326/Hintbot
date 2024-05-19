"use client";

import { ChatBot } from "@/components/chatbot/ChatBot";
import { IDE } from "@/components/editor/CodeEditor";
import { ReturnBox } from "@/components/editor/ReturnBox";
import { Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const content = searchParams.get("content");

  console.log(content);

  return (
    <div className="h-50 m-10">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <div className="mb-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="whitespace-pre-wrap mt-2">{content}</div>
          </div>
          <div>
            <IDE />
          </div>
          <div className="mt-5">
            <ReturnBox />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <ChatBot />
        </Grid>
      </Grid>
    </div>
  );
}
