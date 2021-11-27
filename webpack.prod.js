const path = require("path")
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  entry: "./src/main.ts",
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
  },
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
    path: path.resolve(__dirname, "public/js")
  },
}