import type { TextEditor } from "vscode";

export default function getEditorLine(editor: TextEditor): string {
  const lineNumber = editor.selection.active.line;
  const line = editor.document.lineAt(lineNumber).text;
  console.log("getEditorLine line", line);
  return line;
}
