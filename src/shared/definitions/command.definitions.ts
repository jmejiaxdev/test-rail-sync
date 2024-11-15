import type { ExtensionContext } from "vscode";

export type Command =
  | "add-test-case"
  | "add-test-cases"
  | "delete-test-case"
  | "delete-test-cases"
  | "get-suites"
  | "get-test-case"
  | "get-test-cases"
  | "update-test-case"
  | "update-test-cases";

export type Message = {
  command?: Command; // As defined in the package.json file contributes.commands section
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export interface PostMessageEvent extends MessageEvent {
  data: Message;
}

export type RegisterCommand = {
  command: Command;
  callback: (context: ExtensionContext) => (...args: unknown[]) => unknown;
};
