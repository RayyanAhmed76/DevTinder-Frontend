import io from "socket.io-client";

export const createsocketconnection = () => {
  return io("http://localhost:7777");
};
