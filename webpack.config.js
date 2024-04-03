const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

exports.default = {
  mode: "production",
  target: "node",
  entry: "./script.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
};
