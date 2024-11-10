declare global {
  interface Message {
    // As defined in the package.json file contributes.commands section
    command?:
      | "add-test-case"
      | "add-test-cases"
      | "delete-test-case"
      | "delete-test-cases"
      | "get-suites"
      | "get-test-case"
      | "get-test-cases"
      | "update-test-case"
      | "update-test-cases";
    data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
