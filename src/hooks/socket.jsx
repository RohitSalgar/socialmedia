import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { SOCKET_URL } from "../config";

export const useSocket = () => {
  // const tokenId = localStorage.getItem("amsSocialToken");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("ws://192.168.0.101:8900");
    setSocket(socketInstance);
  }, []);

  return socket;
};
