import React, { useState } from 'react';
import './App.css';
import { ChatContextProvider } from '../contexts/ChatContext';
import { ChatMessage } from '../type';
import { useSocket } from 'src/hooks/socket';

export const App: React.FC = () => {
  const [messageList, setMessageList] = useState<ChatMessage[]>([{
    message: 'Welcome to chat!',
    author: 'bot',
    createdAt: new Date(),
  }]);

  const [input, setInput] = useState('');

  const { socket } = useSocket((message) => {
    console.log({message});
    const addedMessageList = [...messageList, message];
    setMessageList(addedMessageList);
  });

  const send = (): void => {
    if (input === '') return;

    const author: string = 'user1';
    const message = {
      message: input,
      author,
      createdAt: new Date(),
    };
    console.log({ message })
    // socket.send(message);
    socket.emit('message', message);

    setInput('');
  };

  return (
    <ChatContextProvider>
      <div className="App">
        <header className="App-header">
          <ul>
            {messageList.map((message) => {
              return (
              <li key={message.createdAt.getTime()}>
                {message.message} by {message.author} at {message.createdAt.toString()}
              </li>
            );
            })}
          </ul>
          <input
            placeholder="Type your message here..."
            onChange={(e) => {
              console.log(e.target);
              setInput(e.target.value);
            }}
            value={input}
          />
          <button
            onClick={() => {send()}}
          >
            Send
          </button>
        </header>
      </div>
    </ChatContextProvider>
  );
}
