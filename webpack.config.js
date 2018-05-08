const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rules = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader'
  },
  {
    test: /\.svg$/,
    use: 'url-loader'
  }
];

const resolve = {
  extensions: [ '.js', '.ts', '.tsx' ],
  alias: {
    app: path.join( __dirname, 'src' ),
    static: path.join( __dirname, 'static' )
  }
};

module.exports = env => {
  if ( !env.production ) {
    return {
      devtool: "eval",
      mode: 'development',
      entry: [
        'regenerator-runtime/runtime',
        path.join( __dirname, 'src/index.tsx' )
      ],
      output: {
        filename: 'app.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
      },
      module: {
        rules
      },
      resolve
    };
  }

  return {
    mode: 'production',
    entry: [
      'regenerator-runtime/runtime',
      path.join( __dirname, 'src/index.tsx' )
    ],
    output: {
      path: path.join( __dirname, 'dist/' ),
      filename: 'app.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/'
    },
    module: {
      rules,
    },
    resolve, 
    plugins: [
      new HtmlWebpackPlugin( {
        template: 'index.html'
      } )
    ],
  };
};