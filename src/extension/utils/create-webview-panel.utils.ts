import * as path from "path";
import type { ExtensionContext, WebviewPanel } from "vscode";
import { Uri, ViewColumn, window } from "vscode";

export default function createWebviewPanel(context: ExtensionContext, command: string, title: string): WebviewPanel {
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
}
