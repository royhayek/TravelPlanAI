module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo']],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    },
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false
        }
      ],
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          alias: {
            '@app': './src/app',
            '@redux': './src/redux',
            '@shared': './src/shared',
            '@screens': './src/screens'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      ],
    ]
  };
};
