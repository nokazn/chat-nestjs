import { useContext, useEffect } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { ChatMessage } from 'src/type';
import { fromEvent, Observable } from 'rxjs';
import { ChatEvent } from 'src/variables';

type SubscribeEvent = (message: ChatMessage) => void | Promise<void>

export const useSocket = (setEvent: SubscribeEvent) => {
  const { socket } = useContext(ChatContext);

  useEffect(() => {
    const observable: Observable<ChatMessage> = fromEvent(socket, ChatEvent.MESSAGE);
    observable.subscribe((message) => {
      console.log({ message });
      setEvent(message);
    })

    return () => {
      socket.disconnect();
    }
  });

  return {
    socket,
  };
}