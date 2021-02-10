module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(jpg|png|svg)$/,
      use: {
        loader: 'url-loader',
      },
    });

    return config;
  },
};
