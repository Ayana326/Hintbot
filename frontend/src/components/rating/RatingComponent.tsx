import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    Typography,
} from "@mui/material";
import * as React from "react";

export default function RatingDialog() {
  // ダイアログの開閉状態を管理する
  const [open, setOpen] = React.useState(true);

  // 5種類のヒントの評価を保存するための状態
  const [ratings, setRatings] = React.useState([0, 0, 0, 0, 0]);

  // ダイアログを開く
  const handleClickOpen = () => {
    setOpen(true);
  };

  // ダイアログを閉じる
  const handleClose = () => {
    setOpen(false);
  };

  // 各ヒントの評価を更新する
  const handleRatingChange = (index:number, newValue:number) => {
    const newRatings = [...ratings];
    newRatings[index] = newValue;
    setRatings(newRatings);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          正解です！！<br/>コードを書くにあたってヒントは有効でしたか？5つのヒントタイプごとに評価してください
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column", // 垂直方向に配置
              alignItems: "center", // 水平方向で中央揃え
              justifyContent: "center", // 垂直方向で中央揃え
            }}
          >
            {["Hint 1", "Hint 2", "Hint 3", "Hint 4", "Hint 5"].map(
              (hint, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography>{hint}</Typography>

                  <Rating
                    size="large"
                    name={`rating-${index}`}
                    value={ratings[index]}
                    onChange={(event, newValue) =>
                      handleRatingChange(index, newValue!)
                    }
                  />
                </Box>
              )
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>提出</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
