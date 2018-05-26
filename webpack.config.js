const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      entry: {
        app: path.join( __dirname, 'src/index.tsx' )
      },
      output: {
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
    entry: {
      app: path.join( __dirname, 'src/index.tsx' ),
      vendor: [ 'react', 'react-apollo' ],
    },
    output: {
      path: path.join( __dirname, 'dist/' ),
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js"
    },
    module: {
      rules,
    },
    resolve, 
    plugins: [
      new HtmlWebpackPlugin( {
        template: 'index.html'
      } ),
      new BundleAnalyzerPlugin()
    ],
  };
};