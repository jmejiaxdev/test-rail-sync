export {};

import type { Command, Message } from "./definitions/command.definitions";

declare global {
  interface PostMessageEvent extends MessageEvent {
    data: Message;
  }

  interface Window {
    command: Command;
    vscode: {
      postMessage: (message: Message) => void;
    };
  }

  interface WindowEventMap {
    message: MessageEvent<Message>;
  }
}

declare module "vscode" {
  interface Webview {
    postMessage(message: Message): Thenable<boolean>;
  }
}
