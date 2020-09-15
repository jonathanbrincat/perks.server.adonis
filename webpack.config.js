const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
  entry: [
    './resources/scss/foo.scss'
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'foo.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          //fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            // Creates `style` nodes from JS strings
            : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: '[name].css'
      filename: 'foo.css'
    }),
  ]
}
