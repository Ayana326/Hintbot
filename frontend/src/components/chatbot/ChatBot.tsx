import { useEffect, useRef, useState } from "react";
import { MessageBox } from "./MessageBox";
import { MessageBubble } from "./MessageBubble";

export const ChatBot = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // コンテナがレンダリングされるたびにスクロール位置を更新
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const serializedMessage = localStorage.getItem("messages");
    if (serializedMessage) {
      const array = JSON.parse(serializedMessage);
      setMessages(array);
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
          style={{ height: "calc(80vh - 64px)" }}
        >
          {messages.map((message: MessageType, index: number) => {
            return (
              <div key={index}>
                <MessageBubble message={message.user} position="right" />
                <MessageBubble message={message.ai} position="left" />
              </div>
            );
          })}
        </div>
        <div className="text-sending absolute bottom-1 right-0 left-0 m-auto w-11/12">
          <MessageBox messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};
