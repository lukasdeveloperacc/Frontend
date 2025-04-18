import { Message } from "../types/message";

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto mb-2 space-y-2 flex flex-col">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-lg max-w-xs ${
            msg.sender === "user"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 text-gray-900 self-start"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
