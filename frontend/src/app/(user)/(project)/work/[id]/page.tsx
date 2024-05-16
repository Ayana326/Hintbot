"use client";

import { ChatBot } from "@/components/chatbot/ChatBot";
import { IDE } from "@/components/editor/CodeEditor";
import { ReturnBox } from "@/components/editor/ReturnBox";
import { Grid } from "@mui/material";

export default function QuizPage() {
  return (
    <div className="h-50 m-10">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <div>
            <IDE />
          </div>
          <div className="mt-5">
            <ReturnBox />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <ChatBot
            messages={[{ "1": "メッセージ" }]}
            responses={[{ "1": "レスポンス" }]}
          />
        </Grid>
      </Grid>
    </div>
  );
}
