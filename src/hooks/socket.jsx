import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { URL } from "../config";

export const useSocket = () => {
  const tokenId = localStorage.getItem("amsSocialToken");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(URL, {
      query: {
        token: tokenId,
      },
    });

    setSocket(socketInstance);
  }, []);

  return socket;
};
