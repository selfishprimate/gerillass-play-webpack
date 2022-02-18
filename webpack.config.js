const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", //production
  entry: {
    main: path.resolve(__dirname, "src/app.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  devtool: "inline-source-map", // Keeps the path info of the files to track errors.
  devServer: {
    port: 5001, 
    open: true, 
    liveReload: true, // Hot reload
    watchFiles: ["./**/*.html", "./**/*.scss"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Gerillass Play",
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "./src/assets/css/styles.css",
    }),
  ],
};