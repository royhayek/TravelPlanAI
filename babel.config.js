module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          lazyImports: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            app: './',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};
