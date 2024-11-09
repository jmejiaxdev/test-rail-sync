const path = require("path");

const backendExtensionConfig = {
  devtool: "source-map",
  mode: "development", // or 'production' depending on your environment
  target: "node",
  entry: "./src/extension/index.ts",
  output: {
    path: path.resolve(__dirname, "dist/extension"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.extension.json",
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    vscode: "commonjs vscode",
  },
};

const frontendWebviewConfig = {
  devtool: "source-map",
  mode: "development", // or 'production' depending on your environment
  target: "web",
  entry: "./src/webview/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist/webview"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.webview.json",
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = [backendExtensionConfig, frontendWebviewConfig];
