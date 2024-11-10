import type { ExtensionContext } from "vscode";
import { commands } from "vscode";
import type { Command } from "../shared/definitions/command.definitions";
import AddTestCaseCommand from "./commands/add-test-case.command";
import AddTestCasesCommand from "./commands/add-test-cases.command";
import DeleteTestCaseCommand from "./commands/delete-test-case.command";
import DeleteTestCasesCommand from "./commands/delete-test-cases.command";
import GetSuitesCommand from "./commands/get-suites.command";
import GetTestCaseCommand from "./commands/get-test-case.command";
import GetTestCasesCommand from "./commands/get-test-cases.command";
import UpadateTestCaseCommand from "./commands/update-test-case.command";
import UpadateTestCasesCommand from "./commands/update-test-cases.command";

const Commands: Command[] = [
  AddTestCaseCommand,
  AddTestCasesCommand,
  DeleteTestCaseCommand,
  DeleteTestCasesCommand,
  GetSuitesCommand,
  GetTestCaseCommand,
  GetTestCasesCommand,
  UpadateTestCaseCommand,
  UpadateTestCasesCommand,
];

export function activate(context: ExtensionContext): void {
  console.log("TestRail Sync extension is now active!");

  Commands.forEach((command) => {
    context.subscriptions.push(commands.registerCommand(command.command, command.callback(context)));
  });
}

export function deactivate(): void {}
