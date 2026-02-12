import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
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
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...(options.presets || []),
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
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
      '.web.ts',
      '.web.tsx',
    ];

    return config;
  },
};

export default config;
