import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.js',
    'tokens/index': 'src/tokens/index.js',
    'themes/index': 'src/themes/index.js',
  },
  format: ['cjs', 'esm'],
  dts: false,  // No TypeScript declarations
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native', 'react-native-reanimated', 'expo-haptics'],
});
