const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const output = {
  path: path.resolve(__dirname, 'build'),
  publicPath: '/',
  filename: 'bundle.js',
};

const entry = [
  './client/index.js'
];

module.exports = {
  mode: process.env.NODE_ENV,
  entry,
  output,
  plugins: [new HtmlWebpackPlugin({
    template: './client/index.html'
  })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/login': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/signup': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/products': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
      '/dashboard-server': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};