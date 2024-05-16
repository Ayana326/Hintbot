import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  width: number;
  title: string;
  description: string;
};

export const QuizCard = ({ id, width, title, description }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <Card variant="outlined" sx={{ width: `100%`, padding: "0px" }}>
        <CardHeader
          sx={{ paddingBottom: "0px" }}
          titleTypographyProps={{ fontSize: "16px" }}
          title={title}
        />
        <CardContent sx={{ paddingBottom: "0px", fontSize: "14px" }}>
          {description}
        </CardContent>
        <CardActions sx={{ justifyContent: "right", paddingRight: "10px" }}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              router.push(`/work/${id}`);
            }}
          >
            選択する
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
