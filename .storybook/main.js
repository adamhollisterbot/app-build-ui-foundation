/** @type {import('@storybook/react-webpack5').StorybookConfig} */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: false,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...(options.presets || []),
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  }),
  webpackFinal: async (config) => {
    // Add alias for react-native to react-native-web
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native/Libraries/Animated/Easing': 'react-native-web/dist/vendor/react-native/Animated/Easing',
    };

    // Handle react-native-reanimated
    config.resolve.extensions = [
      ...(config.resolve.extensions || []),
      '.web.js',
    ];

    return config;
  },
};

export default config;
