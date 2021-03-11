module.exports = {
  env: {
    API_URL: 'http://localhost:3001',
  },
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
