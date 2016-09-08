const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    quiet: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
  module.exports.output.filename = 'bundle-[hash].js'
  module.exports.plugins.push(
    function () {
      this.plugin('done', function (stats) {
        var replaceInFile = function (filePath, toReplace, replacement) {
          var replacer = function (match) {
            console.log('Replacing in %s: %s => %s', filePath, match, replacement)
            return replacement
          };
          var str = fs.readFileSync(filePath, 'utf8')
          var out = str.replace(new RegExp(toReplace, 'g'), replacer)
          fs.writeFileSync(filePath, out)
        }
        var hash = stats.hash
        replaceInFile(path.join(__dirname, 'index.html'),
          'bundle.js',
          'bundle-' + hash + '.js'
        )
      })
    }
  )
}
