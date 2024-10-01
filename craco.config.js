module.exports = {
  webpack: {
    configure: (webpackConfig) => {
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
        url: require.resolve("url"),
      };
      return webpackConfig;
    },
  },
};
