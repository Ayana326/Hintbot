"use client";

import { RobotTalkIcon } from "@/components/Icons/RobotTalkIcon";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { IDE } from "@/components/editor/CodeEditor";
import { ReturnBox } from "@/components/editor/ReturnBox";
import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Drawer, IconButton, Tooltip } from "@mui/material";
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
  const theme = useTheme();
  const id = params.id;

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
    console.log("タイムスタンプを時間に変換します");
    const currentTime = new Date(calcTime);
    const h = String(currentTime.getHours() - 9).padStart(2, "0");
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    const ms = String(currentTime.getMilliseconds()).padStart(3, "0");
    //　ミリ秒表示
    // setDisplayTime(`${h}:${m}:${s}:${ms}`);
    setDisplayTime(`${h}:${m}:${s}`);
    console.log(displayTime);
  }, [calcTime]);

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

  return (
    <React.Fragment>
      <div>{displayTime}</div>
      <div className="h-50 m-10">
        <div
          style={{ margin: "0px 100px", marginRight: open ? "400px" : "100px" }}
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
            <IDE />
          </div>
          <div className="mt-5">
            <ReturnBox />
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
