import type { ExtensionContext } from "vscode";

export type RegisterCommand = {
  command: Command;
  callback: (context: ExtensionContext) => (...args: unknown[]) => unknown;
};
