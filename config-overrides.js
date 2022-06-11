/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]);

  config.resolve.fallback = {
    process: require.resolve('process/browser'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    asset: require.resolve('assert'),
  };

  // config.resolve = {
  //   ...config.resolve,
  //   extensions: ['.jsx', '.js'],
  //   alias: {
  //     ...config.resolve.alias,
  //     Utils: path.resolve(__dirname, 'src/utils'),
  //     Components: path.resolve(__dirname, 'src/components/'),
  //     Layout: path.resolve(__dirname, 'src/layout'),
  //     Pages: path.resolve(__dirname, 'src/pages'),
  //     Services: path.resolve(__dirname, 'src/services'),
  //   },
  // };

  return config;
};
