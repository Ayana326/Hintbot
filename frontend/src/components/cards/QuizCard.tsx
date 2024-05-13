import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

type Props = {
  width: number;
  title: string;
  description: string;
};

export const QuizCard = ({ width, title, description }: Props) => {
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
          <Button size="small" color="primary">
            選択する
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
