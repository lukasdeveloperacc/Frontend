import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Message } from "../types/message";
import { ragStream } from "../api/rag";

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [respMessage, setRespMessage] = useState<string>("");
  const [botMessageId, setBotMessageId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!respMessage) return;

    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      const lastMsg = newMessages?.[newMessages.length - 1];
      if (lastMsg && lastMsg.id == botMessageId) {
        lastMsg.text = respMessage;
      } else {
        const newMessage = {
          id: Date.now(),
          text: respMessage,
          sender: "bot" as const,
        };
        newMessages.push(newMessage);
        setBotMessageId(newMessage.id);
      }

      return newMessages;
    });
  }, [respMessage]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    handleQuery(text);
  };

  const handleQuery = async (text: string) => {
    try {
      const newMessage: Message = {
        id: Date.now(),
        text,
        sender: "user",
      };
      setMessages([...messages, newMessage]);

      const url = "http://localhost:1234/chat/stream";
      const body = JSON.stringify({ input: { question: text } });
      setRespMessage("");
      await ragStream(url, body, setRespMessage);
      console.log("End");
    } catch (err) {
      console.error("🚨 Fetch error:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-400 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-orange-500 transition-all"
      >
        {isOpen ? "❌" : "💬"}
      </button>

      {isOpen && (
        <div className="h-[600px] w-full max-w-md p-4 bg-white rounded-2xl shadow-lg flex flex-col h-3/4 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <MessageList messages={messages} />
          </div>
          <MessageInput onSend={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
