declare global {
  interface Message {
    command?: "delete-test-cases" | "get-suites" | "get-test-cases" | "save-test-cases";
    data?: any;
  }

  interface PostMessageEvent extends MessageEvent {
    data: Message;
  }

  interface Window {
    command: Message["command"];
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

export {};
