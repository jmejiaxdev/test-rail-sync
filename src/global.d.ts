export {};

declare global {
  type Command =
    | "create-test-case"
    | "create-test-cases"
    | "delete-test-case"
    | "delete-test-cases"
    | "get-suites"
    | "get-test-case"
    | "get-test-cases"
    | "update-test-case"
    | "update-test-cases";

  type Message = {
    command?: Command; // As defined in the package.json file contributes.commands section
    data?: unknown[];
  };

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
