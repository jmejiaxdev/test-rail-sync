import * as path from "path";
import type { ExtensionContext, WebviewPanel, TextEditor } from "vscode";
import { Uri, ViewColumn, window } from "vscode";
// import { Range, Uri, ViewColumn, window } from "vscode";

const createWebviewPanel = (context: ExtensionContext, command: string, title: string): WebviewPanel => {
  const panel = window.createWebviewPanel(command, title, ViewColumn.One, {
    enableScripts: true,
  });

  const bundleUri = Uri.file(path.join(context.extensionPath, "dist", "webview/index.js"));
  const bundlePath = panel.webview.asWebviewUri(bundleUri);
  panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React Webview</title>
      </head>
      <body>
          <div id="root"></div>
          <script>
            window.command = "${command}";
            window.vscode = acquireVsCodeApi();
          </script>
          <script src="${bundlePath}"></script>
      </body>
      </html>
    `;

  return panel;
};

const getEditorLine = (editor: TextEditor): string => {
  const lineNumber = editor.selection.active.line;
  return editor.document.lineAt(lineNumber).text;
};

// const saveContent = (editor: TextEditor, fileContent: string, newContent: string): void => {
//   editor?.edit((editBuilder) => {
//     const entireRange = new Range(editor.document.positionAt(0), editor.document.positionAt(fileContent.length));
//     editBuilder.replace(entireRange, newContent);
//   });
// };

const CommandUtils = {
  createWebviewPanel,
  getEditorLine,
  // saveContent,
};

export default CommandUtils;
