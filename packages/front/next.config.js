module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(jpg|png)$/,
      use: {
        loader: 'url-loader',
      },
    });

    return config;
  },
};
