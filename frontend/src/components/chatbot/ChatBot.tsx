import { ArrowCircleRight } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";

type Props = {
  messages: { [key: string]: string }[];
  responses: { [key: string]: string }[];
};

const CssTextField = styled(TextField)({
  ".mui-1q37jh5-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: "10px 5px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

export const ChatBot = ({ messages, responses }: Props) => {
  return (
    <div className="w-full border">
      <div className="body bg-slate-200 h-120">d</div>
      <div className="text-sending">
        <CssTextField
          sx={{ width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton color="secondary">
                  <ArrowCircleRight />
                </IconButton>
              </InputAdornment>
            ),
          }}
          multiline
        />
      </div>
    </div>
  );
};
