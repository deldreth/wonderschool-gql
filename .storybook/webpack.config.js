const path = require( 'path' );

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  });
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias.app = path.join( __dirname, '../src' );
  config.resolve.alias.static = path.join( __dirname, '../static' );

  return config;
};