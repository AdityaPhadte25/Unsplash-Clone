const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
 entry: "./src/index.js",
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'main.js'
 },
 resolve: {
  extensions: ['.ts', '.js','.jsx','.tsx'],
},
 devServer: {
   port: 3000,
 },
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /nodeModules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader']
     },
     {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
   ]
 },
 plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}