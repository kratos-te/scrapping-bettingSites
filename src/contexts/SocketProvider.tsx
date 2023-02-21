import React, {createContext, useState, useEffect, useContext} from 'react';
import io, { Socket } from "socket.io-client";
// import getConfig from "next/config";
import {
    // ScrapeData,
//   ClientToServerEvents,
//   Player,
    User,
   ServerToClientEvents,
} from "../types/socketio";

// const { publicRuntimeConfig } = getConfig();
export type SocketType = Socket<ServerToClientEvents>;
interface Context {
    socket?: SocketType;
    gameData?: {
        users: User[],
        // currentTaxiPosition: number,
        // gameStarted: boolean
      }
  }
  
const context = createContext<Context>({});

export const useSocket = () => useContext(context);
const SocketProvider = (props: { children: any }) => {
    const [socket, setSocket] = useState<SocketType>();
    const [gameData, setGameData] = useState<{
        // players: Player[],
        // currentTaxiPosition: number,
        // gameStarted: boolean
        users: User[]
      }>()
    
    useEffect(() => {
        // TODO: consider reconnect on page refresh
        // TODO: check why we call the provider twice, we only need one socket
        // TODO: when connecting from firefox we get "unhandledeRejection error"
        // const serverUrl = "https://taxi-bustgame-backend.herokuapp.com";
        const serverUrl = "localhost:8000";
        // const serverUrl = "91.194.11.35:8000"
        const socket = io(serverUrl, {
          transports: ["websocket"],
        });
        socket.on("connect", () => {
          console.log("connected to backend", socket.id);
    
        //   socket.emit(
        //     "startGame",
        //     (
        //         users: User[],
             
        //     ) => {
        //         setGameData({
        //             users: users,
             
        //       })
        //     }
        //   );
        // });
        });
        socket.on("startGame", (users: User[]) => {
            setGameData({
                users: users,
            })
        })

        setSocket(socket);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            gameData
            socket.off("connect");
            socket.off("disconnect");
            setSocket(undefined);
        };
      }, []);
  
  return (
   <context.Provider value={{socket, gameData }}>{props.children}</context.Provider>
  );
}

export default SocketProvider;
