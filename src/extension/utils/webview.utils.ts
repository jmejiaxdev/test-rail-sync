import * as path from "path";
import * as vscode from "vscode";

const getWebviewHtml = (command: Message["command"], panel: vscode.WebviewPanel, extensionPath: string): string => {
  const bundleUri = vscode.Uri.file(path.join(extensionPath, "dist", "webview/index.js"));
  const bundlePath = panel.webview.asWebviewUri(bundleUri);

  return `
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
};

const WebviewUtils = {
  getWebviewHtml,
};

export default WebviewUtils;
