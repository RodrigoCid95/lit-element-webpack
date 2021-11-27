const path = require("path")

module.exports = {
  entry: "./src/main.ts",
  devtool: 'source-map',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: 'minify-html-literals-loader' }]
      },
      {
        test: /.(sass|scss|css)$/,
        use: [
          { loader: "lit-css-loader" },
          { loader: "sass-loader" }
        ]
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".css", ".sass", "scss"],
  },
  output: {
    filename: "js/main.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    devMiddleware: {
      publicPath: "https://localhost:3000",
    },
    hot: true,
    historyApiFallback: true,
  },
}