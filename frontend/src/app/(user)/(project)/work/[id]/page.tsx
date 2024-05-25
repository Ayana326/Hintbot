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
import React, { useState } from "react";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const content = searchParams.get("content");
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  console.log(content);

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
                    <RobotTalkIcon />
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
