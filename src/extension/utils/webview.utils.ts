import * as path from "path";
import * as vscode from "vscode";

const createWebviewPanel = (context: vscode.ExtensionContext, command: string, title: string): vscode.WebviewPanel => {
  const panel = vscode.window.createWebviewPanel(command, title, vscode.ViewColumn.One, {
    enableScripts: true,
  });

  const bundleUri = vscode.Uri.file(path.join(context.extensionPath, "dist", "webview/index.js"));
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

const WebviewUtils = {
  createWebviewPanel,
};

export default WebviewUtils;
