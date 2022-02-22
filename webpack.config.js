import path from "path";
import htmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath (import.meta.url);
const __dirname = dirname(__filename);

const config = {
  entry: path.resolve(__dirname, 'src/home', 'home.component.ts'),
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),      
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }    
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};

export default config;