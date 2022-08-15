const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "inline-source-map",
  mode: "development",
  entry: [
    "webpack-hot-middleware/client",
    path.join(__dirname, "client/index.tsx")
  ],
  output: {
    filename: "bundle.js",
    path: "/",
    publicPath: "/"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.OcurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      React: "react"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};
