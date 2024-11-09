const path = require("path");

module.exports = [
  {
    devtool: "source-map",
    mode: "development", // or 'production' depending on your environment
    // Configuration for the backend (extension) code
    target: "node",
    entry: "./src/extension/index.ts", // Main extension entry point
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
              configFile: "tsconfig.extension.json", // Specify backend tsconfig
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    externals: {
      vscode: "commonjs vscode", // Exclude vscode module from bundling
    },
  },
  {
    devtool: "source-map",
    mode: "development", // or 'production' depending on your environment
    // Configuration for the Webview (React) code
    target: "web",
    entry: "./src/webview/index.tsx", // React app entry point
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
              configFile: "tsconfig.webview.json", // Specify frontend tsconfig
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
  },
];
