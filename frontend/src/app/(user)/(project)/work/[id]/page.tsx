"use client";

import { RobotTalkIcon } from "@/components/Icons/RobotTalkIcon";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { IDE } from "@/components/editor/CodeEditor";
import { ReturnBox } from "@/components/editor/ReturnBox";
import { PythonExecuter } from "@/executers/python";
import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Alert, Drawer, IconButton, TextareaAutosize, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function QuizPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const content = searchParams.get("content");
  const [open, setOpen] = useState<boolean>(true);
  const [displayTime, setDisplayTime] = useState("00:00:00");
  const [calcTime, setcalcTime] = useState(0);
  
  //const [code,setCode] = useState<string>("");
  const theme = useTheme();
  const id = params.id;

  const [pythonExecuter, setPythonExecuter] = useState<PythonExecuter|undefined>(undefined);
  const [execResult, setExecResult] = useState<string>("");
  const [error, setError] = useState<string|null>(null);

  //pythonを実行するもののセットアップ
  useEffect(()=>{
    let _pythonExecuter = new PythonExecuter(
      (msg)=>{setExecResult((prev)=>prev.length>0?prev+"\n"+msg:msg)},
      setError,
    );
    _pythonExecuter.init().then(()=>{
      setPythonExecuter(_pythonExecuter)
    }).catch((err)=>{
      setError(`${err}`)
    })
  }, [])

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

  const onCodeExec = async (code:string) => {
    try{
      if(!pythonExecuter){
        setError("python executer is not ready yet.")
        return
      }else{
        setExecResult("");
        setError(null);
        await pythonExecuter.exec(code);
      }
    }catch(e){
      setError(`${e}`)
    }
    

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
            <IDE 
              onSubmit={onCodeExec}
            ></IDE>
          </div>
          <div className="mt-5">
            <ReturnBox>
              <div>
              {
              error&&<Alert severity="error">{error}</Alert>
              }
              {
                execResult&&
                <TextareaAutosize 
                  className="w-full bg-white" 
                  minRows={3}
                  maxRows={20}
                  value={execResult} 
                  disabled
                />
              }
              </div>
            </ReturnBox>
          </div>
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
              <IconButton onClick={handleDrawerClose}>
                {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
              ヒントボット
            </DrawerHeader>
            <ChatBot />
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  );
}
