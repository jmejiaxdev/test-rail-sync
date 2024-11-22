import type { ExtensionContext } from "vscode";
import { commands } from "vscode";
import type { RegisterCommand } from "../shared/definitions/command.definitions";
import * as Commands from "./commands";

export function activate(context: ExtensionContext): void {
  console.log("TestRail Sync extension is now active!");

  Object.keys(Commands).forEach((key: string) => {
    const { command: title, callback } = Commands[key] as RegisterCommand;
    context.subscriptions.push(commands.registerCommand(title, callback(context)));
  });
}

export function deactivate(): void {}
