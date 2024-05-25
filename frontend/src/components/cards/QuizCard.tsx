import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  width: number;
  quiz: QuizType;
};

export const QuizCard = ({ width, quiz }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <Card sx={{ width: `100%`, padding: "0px" }}>
        <CardHeader
          sx={{ paddingBottom: "0px" }}
          titleTypographyProps={{ fontSize: "16px" }}
          title={quiz.title}
        />
        <CardContent sx={{ paddingBottom: "0px", fontSize: "14px" }}>
          {quiz.abstract}
        </CardContent>
        <CardActions sx={{ justifyContent: "right", paddingRight: "10px" }}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              router.push(
                `/work/${quiz.id}?title=${encodeURIComponent(quiz.title)}&content=${encodeURIComponent(quiz.content)}`
              );
            }}
          >
            選択する
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
