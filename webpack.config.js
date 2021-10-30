module.exports = {
  entry: './example/usage.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    static: "./example",
  },
  resolve: {
    extensions: ['.webpack.js', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
