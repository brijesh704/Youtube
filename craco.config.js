const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore ESLint Errors in production
      webpackConfig.plugins.forEach((plugin) => {
        if (plugin instanceof ESLintWebpackPlugin) {
          plugin.options.failOnError = process.env.NODE_ENV === "production";
        }
      });

      // Configure fallback for Node.js modules
      webpackConfig.resolve.fallback = {
        http: require.resolve("stream-http"),
        fs: false,
        assert: false,
        crypto: false,
        util: require.resolve("util/"),
        querystring: false,
        buffer: require.resolve("buffer/"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        url: require.resolve("url"),
        zlib: require.resolve("browserify-zlib"),
      };

      return webpackConfig;
    },
  },
};
