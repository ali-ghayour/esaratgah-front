import { useEffect, useState } from "react";
import { useSocket } from "../../../../customProviders/SocketProvider";

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
}

export const useChat = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    const handleReceiveMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]);

  return { messages };
};
