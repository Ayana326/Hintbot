import { ArrowCircleRight } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

const CssTextField = styled(TextField)({
  ".mui-1q37jh5-MuiInputBase-root-MuiOutlinedInput-root": {
    padding: "10px 5px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "whitesmoke",
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
});

type Props = {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};

export const MessageBox = ({ messages, setMessages }: Props) => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [wait, setWait] = useState<boolean>(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onButtonClick = async () => {
    setWait((prevState) => !prevState);
    let newMessage = { user: userMessage, ai: "" };

    // メッセージ配列に新しいメッセージを追加
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    // 5秒待機
    await sleep(2000);

    // 新しいメッセージオブジェクトのコピーを作成してaiプロパティを更新
    let updatedMessage = { ...newMessage, ai: "レスポンス" };

    // メッセージ配列の最後のメッセージを更新
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = updatedMessage;
      return updatedMessages;
    });
    setWait((prevState) => !prevState);
  };

  return (
    <div>
      <CssTextField
        disabled={wait}
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                color="secondary"
                disabled={userMessage.length === 0}
                onClick={() => onButtonClick()}
              >
                <ArrowCircleRight />
              </IconButton>
            </InputAdornment>
          ),
        }}
        multiline
        value={userMessage}
        onChange={(e) => {
          setUserMessage(e.target.value);
        }}
      />
    </div>
  );
};
