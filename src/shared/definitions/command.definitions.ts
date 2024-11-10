import type { ExtensionContext } from "vscode";

export type Command = {
  command: string;
  callback: (context: ExtensionContext) => (...args: unknown[]) => unknown;
};
