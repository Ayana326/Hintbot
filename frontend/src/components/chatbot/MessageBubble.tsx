import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Chip, IconButton, styled } from "@mui/material";
import React, { FC, ReactNode, useState } from "react";

type Props = {
  message: string;
  position: "right" | "left";
  children?: ReactNode;
};

const CustomChip = styled(Chip)({
  ".MuiChip-label": {
    overflow: "visible",
  },
});

//TODO: messageが複数ある際に左右でメッセージ切り替えできるコンポーネントを作成 
export const MultipleMessageBubble: FC<{
  messages: string[];
  position: "right" | "left";
  children?: ReactNode;
}> = ({ messages, position, children }) => {
  const [index, setIndex] = useState<number>(0);
  return <MessageBubble
    message={messages[index] ?? ""}
    position={position}
  >
    <div className="text-center">
    </div>
    <div className="flex items-center justify-center h-4">
      <IconButton
        onClick={() => {
          setIndex((prev) => (messages.length + prev - 1) % messages.length);
        }}
        disabled={index == 0}
      >
        <ArrowLeft />
      </IconButton>
      <span>
        {index + 1}/{messages.length}
      </span>
      <IconButton
        onClick={() => {
          setIndex((prev) => (prev + 1) % messages.length);
        }}
        disabled={messages.length === 0 || index === messages.length - 1}
      >
        <ArrowRight />
      </IconButton>
    </div>
    {children}
  </MessageBubble>
}

export const MessageBubble: FC<Props> = ({ message, position, children }) => {
  return (
    <div
      data-position={position == "right"}
      className={`data-[position=true]:text-right mt-3 mb-8`}
    >
      {message.length != 0 ? (
        <Chip
          sx={{
            padding: "5px 0",
            maxWidth: "70%",
            height: "auto",
            "& .MuiChip-label": {
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            },
            textAlign: "left",
          }}
          label={<div>
            {message}
            {children}
          </div>}
        >
        </Chip>
      ) : (
        <CustomChip
          sx={{
            padding: "0px 0",
            width: "100px",
            height: "30px",
            overflow: "none",
          }}
          label={
            <div className="loader"></div>
          }
        >
        </CustomChip>
      )}
    </div>
  );
};
