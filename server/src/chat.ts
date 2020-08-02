import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import { createServer } from 'http';
import type { Server } from 'http';

import { ChatEvent } from '../../common/variables';
import { ChatMessage } from '../../common/type';

export class Chat {
  public static readonly PORT: number = 8080;
  private port: number;
  private _app: Express.Application;
  private server: Server;
  private io: SocketIO.Server;

  constructor() {
    const app = express();
    app.use(cors());
    app.options('*', cors());

    this.port = Number(process.env.PORT) || Chat.PORT;
    this._app = app;
    this.server = createServer(app);
    this.io = io.listen(this.server);

    this.listen();
  }

  get app(): Express.Application {
    return this._app;
  }

  private listen(): void {
    this.server.listen(this.port);

    this.io.on(ChatEvent.CONNECT, (socket) => {
      console.log(`Connected client on port ${this.port}! 🎉`);

      socket.on(ChatEvent.MESSAGE, (message: ChatMessage) => {
        console.log(`[server] (message): ${JSON.stringify(message)}`);
        this.io.emit('message', message);
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        console.log('Client disconnected. 😴');
      });
    });
  }
}
