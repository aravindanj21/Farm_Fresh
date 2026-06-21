import { useEffect, useRef } from "react";

const useSocket = (userId, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("Creating socket for:", userId);

    const ws = new WebSocket(
      `ws://localhost:8000/ws/${userId}`
    );

    socketRef.current = ws;

    ws.onopen = () => {
      console.log(
        "✅ Connected:",
        userId
      );
    };

    ws.onmessage = (event) => {
      console.log(
        "📩 Message:",
        event.data
      );

      if (onMessage) {
        onMessage(
          JSON.parse(event.data)
        );
      }
    };

    ws.onerror = (error) => {
      console.error(
        "❌ Socket Error:",
        error
      );
    };

    ws.onclose = (event) => {
      console.log(
        "🔌 Closed:",
        event.code,
        event.reason
      );
    };

    return () => {
      console.log(
        "Closing socket"
      );
      ws.close();
    };
  }, [userId]);

  return {};
};

export default useSocket;