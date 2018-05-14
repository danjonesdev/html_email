import 'babel-polyfill';

const configureBabelLoader = browserlist => {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          [
            'env',
            {
              debug: false,
              modules: false,
              useBuiltIns: true,
              targets: {
                browsers: browserlist
              }
            }
          ]
        ]
      }
    }
  };
};

const baseConfig = {
  mode: 'development',
  output: {
    filename: '[name].js'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js'],
    modules: ['src/static/scripts', 'node_modules']
  },
  optimization: {
    namedModules: true, // NamedModulesPlugin()
    splitChunks: {
      // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: 2
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true // ModuleConcatenationPlugin
  }
};

if (process.env.NODE_ENV === 'production') {
  baseConfig.mode = 'production';
}

const modernConfig = Object.assign({}, baseConfig, {
  entry: {
    bundle: './src/static/scripts/index.js'
  },
  module: {
    rules: [
      configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">
        'last 2 Chrome versions',
        'not Chrome < 60',
        'last 2 Safari versions',
        'not Safari < 10.1',
        'last 2 iOS versions',
        'not iOS < 10.3',
        'last 2 Firefox versions',
        'not Firefox < 54',
        'last 2 Edge versions',
        'not Edge < 15'
      ])
    ]
  }
  // plugins: configurePlugins({ runtimeName: 'runtime' })
});

const legacyConfig = Object.assign({}, baseConfig, {
  entry: {
    'bundle-legacy': './src/static/scripts/index.js'
  },
  module: {
    rules: [configureBabelLoader(['> 1%', 'last 2 versions'])]
  }
  // plugins: configurePlugins({ runtimeName: 'runtime-legacy' })
});

module.exports = [modernConfig, legacyConfig];
