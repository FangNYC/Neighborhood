const webpack = require('webpack');
const path = require('path');

const client = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },
    ],
  }, 
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({                      // Reduce size of React
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),          // Minify everything
    new webpack.optimize.AggressiveMergingPlugin()  // Merge chunks 
  ],
};

const server = {
  context: __dirname + '/client',
  entry: './server.jsx',
  target: 'node',
  output: {
    filename: 'bundle-server.js',
    path: __dirname + '/public',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: __dirname + '/client',
        loader: 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
}

module.exports = [client, server];