/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../modules/auth";

const SOCKET_URL = import.meta.env.VITE_APP_API_URL;

const SocketContext = createContext<{
  socket: Socket | null;
  sendMessage: (message: string, receiverId: string) => void;
}>({
  socket: null,
  sendMessage: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser, auth } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback(() => {
    if (!socket && currentUser) {
      const newSocket = io(SOCKET_URL, {
        auth: { token: auth?.api_token },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => console.log("✅ Socket connected"));
      newSocket.on("disconnect", () => console.log("❌ Socket disconnected"));
    }
  }, [currentUser, auth, socket]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  useEffect(() => {
    if (currentUser) {
      connectSocket();
    } else {
      disconnectSocket();
    }

    return () => disconnectSocket();
  }, [currentUser, connectSocket, disconnectSocket]);

  // 🔥 Function to send a message
  const sendMessage = (message: string, receiverId: string) => {
    if (socket) {
      socket.emit("sendMessage", {
        message,
        receiverId,
        senderId: currentUser?._id,
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
