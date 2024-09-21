"use client";

import { RobotTalkIcon } from "@/components/Icons/RobotTalkIcon";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { ChatBotSettingComponent } from "@/components/chatbot/Setting";
import { IDE } from "@/components/editor/CodeEditor";
import { ReturnBox } from "@/components/editor/ReturnBox";
import RatingDialog from "@/components/rating/RatingComponent";
import { PythonExecuter } from "@/executers/python";
import { useTheme } from "@emotion/react";
import { Settings } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Alert,
  Button,
  Drawer,
  IconButton,
  TextareaAutosize,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { quizzes } from "../../../../../../data/quiz_index";




export default function QuizPage({ params }: { params: { id: string } }) {

  const DefaultCode: string = `import sys

def main(input):
  print(input)

if __name__ == "__main__":
  input:str = sys.stdin.read().strip()
  main(input)
`;



  const searchParams = useSearchParams();
  const [open, setOpen] = useState<boolean>(true);
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [calcTime, setcalcTime] = useState(0);
  const [code, setCode] = useState<string>(DefaultCode);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("");

  //const [code,setCode] = useState<string>("");
  const theme = useTheme();
  const id = params.id;

  const [pythonExecuter, setPythonExecuter] = useState<
    PythonExecuter | undefined
  >(undefined);
  const [execResult, setExecResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const doCheck = useRef(false) 
  //pythonを実行するもののセットアップ
  useEffect(() => {

    const targetQuiz = quizzes.filter((quiz) => quiz.id === params.id)[0];
    setTitle(targetQuiz.title)
    setContent(targetQuiz.content)

    let _pythonExecuter = new PythonExecuter(
      targetQuiz.stdin ?? "",
      (msg) => {
        setExecResult((prev) => (prev.length > 0 ? prev + "\n" + msg : msg));
        console.log(doCheck.current)
        if(doCheck.current){
          console.log(doCheck.current);
          if(targetQuiz.answer && targetQuiz.answer===msg){
            setIsCorrect(true)
            console.log("correct")
          }else{
            setIsCorrect(false);
            console.log("wrong answer")
          }
          doCheck.current = false
        }
      },
      setError
    );
    _pythonExecuter
      .init()
      .then(() => {
        setPythonExecuter(_pythonExecuter);
      })
      .catch((err) => {
        setError(`${err}`);
      });
  }, []);

  useEffect(() => {
    const localStrageID = localStorage.getItem("id");
    if (localStrageID != id) {
      localStorage.removeItem("messages");
      localStorage.setItem("id", id);
      localStorage.setItem("start_time", Date.now().toString());
    }
    if (localStorage.getItem("start_time") == null) {
      localStorage.setItem("start_time", Date.now().toString());
    }
    const start = localStorage.getItem("start_time");
    if (start) {
      const timerInterval = window.setInterval(() => {
        setcalcTime(Date.now() - Number(start));
      }, 1000);
    }
  }, [id]);

  useEffect(() => {
    const currentTime = new Date(calcTime);
    const h = String(currentTime.getHours() - 9).padStart(2, "0");
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    const ms = String(currentTime.getMilliseconds()).padStart(3, "0");
    //　ミリ秒表示
    // setDisplayTime(`${h}:${m}:${s}:${ms}`);
    setDisplayTime(`${h}:${m}:${s}`);
  }, [calcTime, setDisplayTime]);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const onCodeExec = async (code: string) => {
    try {
      if (!pythonExecuter) {
        setError("python executer is not ready yet.");
        return;
      } else {
        setExecResult("");
        setError(null);
        await pythonExecuter.exec(code);
      }
    } catch (e) {
      setError(`${e}`);
    }
  };


  const onSubmit = () => {
    doCheck.current = true
    onCodeExec(code)
    
  }

  return (
    <React.Fragment>
      <div>{displayTime}</div>
      <div className="h-50 m-10">
        <div
          style={{
            margin: "0px 50px",
            marginRight: open ? "400px" : "50px",
            minWidth: "500px",
          }}
        >
          <div className="mb-3">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="whitespace-pre-wrap mt-2">{content}</div>
              </div>
              {open ? (
                <></>
              ) : (
                <Tooltip title="Chat for Hint">
                  <IconButton onClick={handleDrawerOpen}>
                    <RobotTalkIcon size={45} />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          <div>
            <IDE onSubmit={onCodeExec} code={code} setCode={setCode}></IDE>
          </div>
          <div className="mt-5">
            <ReturnBox>
              <div>
                {error && <Alert severity="error">{error}</Alert>}
                {execResult && (
                  <TextareaAutosize
                    className="w-full bg-white"
                    minRows={3}
                    maxRows={20}
                    value={execResult}
                    disabled
                  />
                )}
              </div>
            </ReturnBox>
          </div>
          <div className="text-right mb-3">
            <Button variant="outlined" onClick={() => onSubmit()}>
              提出
            </Button>
          </div>

          {isCorrect !== undefined &&
            (isCorrect ? (
              <Alert className="w-full" severity={"success"}>
                正解です！
              </Alert>
            ) : (
              <Alert className="w-full" severity="error">
                間違っています
              </Alert>
            ))}
        </div>

        <Drawer
          sx={{
            width: "400px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "400px",
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <div className="mt-12">
            <DrawerHeader>
              <div className="w-full px-2 flex items-center justify-between">
                <div className="flex items-center">
                  <IconButton onClick={handleDrawerClose}>
                    {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                  <span>ヒントボット</span>
                </div>
                <IconButton
                  onClick={() => {
                    setIsSettingOpen((prev) => !prev);
                  }}
                  color="default"
                >
                  <Settings />
                </IconButton>
              </div>
            </DrawerHeader>
            {isSettingOpen && <ChatBotSettingComponent />}
            <ChatBot problem={`${title}\n${content}`} />
          </div>
        </Drawer>
        
        {isCorrect && <RatingDialog/>}
      </div>
    </React.Fragment>
  );
}
