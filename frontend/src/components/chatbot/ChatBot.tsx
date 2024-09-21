import { HintInstructions } from "@/types/hintBot";
import { MessageType } from "@/types/Project";
import { FC, useEffect, useRef, useState } from "react";
import { MessageBox } from "./MessageBox";
import { MessageBubble, MultipleMessageBubble } from "./MessageBubble";

export const ChatBot: FC<{
  problem: string;
}> = ({ problem }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesLocalStorageKey = "messages";

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // コンテナがレンダリングされるたびにスクロール位置を更新
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const serializedMessage = localStorage.getItem(messagesLocalStorageKey);
    if (serializedMessage) {
      try {
        const messagesStored = JSON.parse(serializedMessage) as MessageType[];
        setMessages(messagesStored);
        //保存されたデータの検証(本当はいい感じのライブラリを使って検証したい)
        for (let messageStored of messagesStored) {
          if (typeof messageStored.user !== "string")
            throw new Error("type mismatch");
          for (let messageStoredAImessage of messageStored.ai) {
            if (
              typeof messageStoredAImessage.hint !== "string" ||
              !Object.keys(HintInstructions).includes(
                messageStoredAImessage.hint_type,
              )
            )
              throw new Error("type mismatch");
          }
        }
      } catch (e) {
        //localStorageのデータを削除
        console.error(e);
        localStorage.removeItem(messagesLocalStorageKey);
        setMessages([]);
        console.log("old messages stored locally was deleted.");
      }
    } else {
      setMessages([]);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div className="border rounded-md relative h-full">
        <div
          ref={scrollRef}
          className="body p-6 overflow-scroll"
          style={{ height: "calc(100vh - 176px)" }}
        >
          {messages.map((message: MessageType, index: number) => {
            return (
              <div key={index}>
                <MessageBubble message={message.user} position="right" />
                <MultipleMessageBubble
                  messages={message.ai.map(
                    (d) =>
                      `hint-type: ${Object.keys(HintInstructions).indexOf(d.hint_type) + 1}\n\n${d.hint}`
                  )}
                  position="left"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-sending absolute bottom-1 right-0 left-0 m-auto w-11/12">
        <MessageBox
          problem={problem}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};
