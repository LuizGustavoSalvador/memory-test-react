const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const lessRegex = /\.less$/;
      const lessModuleRegex = /\.module\.less$/;

      // Adiciona suporte para arquivos .less
      webpackConfig.module.rules.push({
        test: lessRegex,
        exclude: lessModuleRegex,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      });

      // Adiciona suporte para módulos CSS .less
      webpackConfig.module.rules.push({
        test: lessModuleRegex,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: env === 'development',
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      });

      // Adiciona suporte para importação de arquivos .less
      webpackConfig.resolve.extensions.push('.less');

      return webpackConfig;
    },
  },
};
