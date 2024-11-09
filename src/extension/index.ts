import * as vscode from "vscode";
import DeleteTestCasesCommand from "./commands/delete-test-cases.command";
import GetSuitesCommand from "./commands/get-suites.command";
import GetTestCasesCommand from "./commands/get-test-cases.command";
import SaveTestCasesCommand from "./commands/save-test-cases.command";

const commands = [GetSuitesCommand, GetTestCasesCommand, SaveTestCasesCommand, DeleteTestCasesCommand];

export function activate(context: vscode.ExtensionContext): void {
  commands.forEach((command) => {
    context.subscriptions.push(vscode.commands.registerCommand(command.command, command.callback(context)));
  });
}

export function deactivate(): void {}
