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

export interface Message {
  // As defined in the package.json file contributes.commands section
  command?: Command;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type RegisterCommand = {
  command: Command;
  callback: (context: ExtensionContext) => (...args: unknown[]) => unknown;
};
