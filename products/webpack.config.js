const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ReactNative = require('@callstack/repack');
const {ModuleFederationPlugin} = require('webpack').container;

const STANDALONE = Boolean(process.env.STANDALONE);

const mode = ReactNative.getMode({fallback: 'development'});
const dev = mode === 'development';
const context = ReactNative.getContext();
const entry = ReactNative.getEntry();
const platform = ReactNative.getPlatform({fallback: process.env.PLATFORM});
const minimize = ReactNative.isMinimizeEnabled({fallback: !dev});
const devServer = ReactNative.getDevServerOptions();
devServer.hmr = STANDALONE ? devServer.hmr : false;
const reactNativePath = ReactNative.getReactNativePath();

process.env.BABEL_ENV = mode;

/**
 * Webpack configuration.
 */
module.exports = {
  mode,
  devtool: false,
  context,
  entry: [
    ...ReactNative.getInitializationEntries(reactNativePath, {
      hmr: devServer.hmr,
    }),
    entry,
  ],
  resolve: {
    ...ReactNative.getResolveOptions(platform),
  },

  output: {
    clean: true,
    path: path.join(__dirname, 'build', platform),
    filename: 'index.bundle',
    chunkFilename: '[name].chunk.bundle',
    publicPath: ReactNative.getPublicPath(devServer),
  },

  optimization: {
    /** Enables minification based on values passed from React Native CLI or from fallback. */
    minimize,
    /** Configure minimizer to process the bundle. */
    minimizer: [
      new TerserPlugin({
        test: /\.(js)?bundle(\?.*)?$/i,
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [
          /node_modules(.*[/\\])+react/,
          /node_modules(.*[/\\])+@react-native/,
          /node_modules(.*[/\\])+@react-navigation/,
          /node_modules(.*[/\\])+@react-native-community/,
          /node_modules(.*[/\\])+@expo/,
          /node_modules(.*[/\\])+pretty-format/,
          /node_modules(.*[/\\])+metro/,
          /node_modules(.*[/\\])+abort-controller/,
          /node_modules(.*[/\\])+@callstack[/\\]repack/,
        ],
        use: 'babel-loader',
      },

      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            /** Add React Refresh transform only when HMR is enabled. */
            plugins: devServer.hmr ? ['module:react-refresh/babel'] : undefined,
          },
        },
      },

      {
        test: ReactNative.getAssetExtensionsRegExp(
          ReactNative.ASSET_EXTENSIONS,
        ),
        use: {
          loader: '@callstack/repack/assets-loader',
          options: {
            platform,
            devServerEnabled: devServer.enabled,

            scalableAssetExtensions: ReactNative.SCALABLE_ASSETS,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(dev),
    }),

    new ReactNative.AssetsResolverPlugin({
      platform,
    }),

    new ReactNative.TargetPlugin(),

    new ReactNative.OutputPlugin({
      platform,
      devServerEnabled: devServer.enabled,
    }),

    new ReactNative.DevServerPlugin({
      platform,
      ...devServer,
    }),

    new webpack.SourceMapDevToolPlugin({
      test: /\.(js)?bundle$/,
      exclude: /\.chunk\.(js)?bundle$/,
      filename: '[file].map',
      append: `//# sourceMappingURL=[url]?platform=${platform}`,
      moduleFilenameTemplate: 'webpack://products/[resource-path]?[loaders]',
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.(js)?bundle$/,
      include: /\.chunk\.(js)?bundle$/,
      filename: '[file].map',
      append: `//# sourceMappingURL=[url]?platform=${platform}`,
      moduleFilenameTemplate: 'webpack://products/[resource-path]?[loaders]',
    }),
    new ReactNative.LoggerPlugin({
      platform,
      devServerEnabled: devServer.enabled,
      output: {
        console: true,
      },
    }),

    new ModuleFederationPlugin({
      name: 'products',
      filename: `products.container.bundle`,
      library: {
        name: 'products',
        type: 'self',
      },
      exposes: {
        './App.js': './App.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: STANDALONE,
        },
        'react-native': {
          singleton: true,
          eager: STANDALONE,
          requiredVersion: '0.70.0',
        },
        'react-native-fast-image': {
          singleton: true,
          eager: STANDALONE,
          requiredVersion: '^8.6.1',
        },
      },
    }),
  ],
};
