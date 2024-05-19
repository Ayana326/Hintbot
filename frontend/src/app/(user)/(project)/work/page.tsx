"use client";
import { QuizCard } from "@/components/cards/QuizCard";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { quizzes } from "../../../../../data/quiz_index";

const quiz_title: { [key: string]: string } = {
  print: "出力",
  variable: "変数",
  conditional_branch: "条件分岐",
  loop: "ループ処理",
  comprehensive: "総合問題",
};

export default function WorkPage() {
  const [quiz, setQuiz] = useState<QuizType[][]>([]);

  const fetchAllQuizzes = (): QuizType[] => {
    return quizzes as QuizType[];
  };

  useEffect(() => {
    const quizzes = fetchAllQuizzes();

    const newQuizzes: QuizType[][] = [];
    let quizCollenction: QuizType[] = [];
    let quizType = "";
    quizzes.forEach((quiz: QuizType, index: number) => {
      if (quizType != quiz.type && quizType != "") {
        newQuizzes.push(quizCollenction);
        quizCollenction = [];
      }
      quizCollenction.push(quiz);
      quizType = quiz.type;

      if (index === quizzes.length - 1) {
        newQuizzes.push(quizCollenction);
      }
    });

    setQuiz(newQuizzes);
  }, []);

  return (
    <div className="mx-10">
      <h2 className="text-lg font-bold mb-2">クイズ一覧</h2>
      {quiz.map((quizCollection: QuizType[], index: number) => {
        const type = quizCollection[0].type;
        return (
          <div key={index} className="mb-8 mt-5">
            <h2 className="text-black text-2xl font-bold">
              {quiz_title[type]}
            </h2>
            <Grid container spacing={2}>
              {quizCollection.map((quiz: any) => {
                return (
                  <Grid item xs={12} sm={12} md={4} lg={3} xl={2} key={quiz.id}>
                    <QuizCard width={240} quiz={quiz} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
