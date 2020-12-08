import io, { Socket } from 'socket.io-client';

import React, { createContext, useState, useEffect, Context, Props } from 'react';
import { ChatMessage } from 'src/type';

// Consumer が Provider を見つけられないときにのみデフォルト値が参照される
export const ChatContext: Context<{socket: SocketIOClient.Socket}> = createContext({
  socket: io.connect('localhost:8080'),
});

export const ChatContextProvider = ({ children }: Props<{}>) => {
  // 一度だけインスタンスを作成
  const [socket] = useState(() => io.connect('localhost:8080'));
  console.log('created');

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  },  []);

  return (
    <ChatContext.Provider value={{ socket }}>
      {children}
    </ChatContext.Provider>
  );
};
