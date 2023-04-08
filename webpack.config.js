const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/cdn.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cdn.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
    },
    port: 3000,
    hot: true,
    open: true,
  },
};
