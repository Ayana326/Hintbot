import { Body } from "@/app/api/hintbot/ask/route";
import { ArrowCircleRight } from "@mui/icons-material";
import {
  Alert,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { parseCookies } from "nookies";

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
  const [error, setError] = useState<string>("");
  //const sleep = (ms: number) =>
  //  new Promise((resolve) => setTimeout(resolve, ms));

  const fetchAnswer: (question: string) => Promise<string> = async (
    question: string,
  ) => {
    const { token } = parseCookies();
    if (!token) throw Error("token required. do login first.");
    const body: Body = {
      hint_type: "with-code",
      question: question,
    };
    const host = process.env.HOST ?? "http://localhost:3000";
    const response = await fetch(`${host}/api/hintbot/ask`, {
      method: "POST",
      headers: {
        cookie: `token=${token}; Secure;`,
      },
      body: JSON.stringify(body),
    });
    const resBody = await response.json();
    if (!response.ok) {
      throw Error(`[${response.status}] ${response.statusText}: ${resBody}`);
    }
    const { answer } = resBody;
    if (!answer) {
      throw Error("answer not found in response");
    }
    return `${answer}`;
  };

  const onButtonClick = async () => {
    setWait((prevState) => !prevState);
    let newMessage = { user: userMessage, ai: "" };

    // メッセージ配列に新しいメッセージを追加
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    // 2秒待機
    //await sleep(2000);
    let answer = "";
    try {
      answer = await fetchAnswer(newMessage.user);
      console.debug("answer: ", answer);
      setError("");
    } catch (e) {
      console.error(e);
      setError(`${e}`);
      return;
    }

    // 新しいメッセージオブジェクトのコピーを作成してaiプロパティを更新
    let updatedMessage = { ...newMessage, ai: answer };

    // メッセージ配列の最後のメッセージを更新
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = updatedMessage;
      const serializedArray = JSON.stringify(updatedMessages);
      localStorage.setItem("messages", serializedArray);
      return updatedMessages;
    });

    console.log(localStorage.getItem("messages"));
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
      {error !== "" && <Alert severity="error">{error}</Alert>}
    </div>
  );
};
