"use client";
import { QuizCard } from "@/components/cards/QuizCard";
import { Container, Grid } from "@mui/material";
import { quizzes } from "../../../../../data/quiz_index";

export default function WorkPage() {
  return (
    <Container maxWidth="xl">
      <h2 className="text-lg font-bold mb-2">クイズ一覧</h2>
      <Grid container spacing={2}>
        {quizzes.map((quiz: any) => {
          return (
            <Grid item xs={12} sm={12} md={4} lg={3} key={quiz.id}>
              <QuizCard
                width={240}
                title={quiz.title}
                description={quiz.abstract}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
