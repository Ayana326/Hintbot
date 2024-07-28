import { AskHintBotRequestBody } from "@/app/api/hintbot/ask/route";
import { HintInstructionTypes, HintInstructions } from "@/types/hintBot";
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
import { MessageType, MessageTypeAI } from "@/types/Project";
import { useChatBotSettingContext } from "./Setting";

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
  problem: string;
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
};

export const MessageBox = ({ problem, messages, setMessages }: Props) => {
  const { enabledHintInstructionTypes } = useChatBotSettingContext();
  const [userMessage, setUserMessage] = useState<string>("");
  const [wait, setWait] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  //const sleep = (ms: number) =>
  //  new Promise((resolve) => setTimeout(resolve, ms));

  const fetchAnswer = async (
    problem: string,
    question: string,
    hint_types: HintInstructionTypes[],
    message_history: string,
  ) => {
    const { token } = parseCookies();
    if (!token) throw Error("token required. do login first.");

    let res: MessageTypeAI[] = [];
    for (let hint_type of hint_types) {
      const body: AskHintBotRequestBody = {
        hint_type: hint_type,
        question: question,
        problem: problem,
        message_history: message_history,
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
      res.push({
        hint_type: hint_type,
        hint: `${answer}`,
      })
    }
    return res;
  };

  const onButtonClick = async () => {
    setWait((prevState) => !prevState);
    let newMessage: MessageType = { user: userMessage, ai: [] };

    // メッセージ配列に新しいメッセージを追加
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    let answer: MessageTypeAI[] = [];
    try {
      //const hintInstructionTypesArray = Object.keys(HintInstructions) as HintInstructionTypes[];
      const messageHistoryMaxLimit = 1;
      const messagesUsedForHistory = messages.slice().reverse().slice(0, Math.min(messages.length, messageHistoryMaxLimit));
      const messageHistory = messagesUsedForHistory.map((m) => {
        const aiHints = m.ai.map((aim) => {
          return `- (hint_type: ${aim.hint_type}) ${aim.hint}\n`;
        }).join("");

        return `人間からの質問:\n- ${m.user}\nAIからのヒント:\n${aiHints}`;
      }).join("\n");

      answer = await fetchAnswer(
        problem,
        newMessage.user,
        enabledHintInstructionTypes,
        messageHistory,
      );
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
