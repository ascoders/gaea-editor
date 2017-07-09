import * as path from "path"
import * as webpack from "webpack"

const projectRoot = process.cwd()

const webpackConfig = {
  entry: path.join(__dirname, "../index.js"),

  output: {
    path: path.join(__dirname, ".."),
    filename: "bundle.js",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader",
        ],
        exclude: [
          /node_modules/
        ],
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: false,
      compress: {
        warnings: false
      }
    })
  ],

  performance: {
    // 关闭性能提示
    hints: false,
  }
}

export default webpackConfig
