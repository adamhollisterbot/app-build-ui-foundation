# @appbuild/ui-foundation

Polished, native-feeling UI components for React Native + Web with comprehensive theming support.

## Features

- ✨ **Polished components** - Native-feeling UI that works on iOS, Android, and Web
- 🎨 **Theming infrastructure** - Complete token system with light/dark mode
- 🔧 **Extensible** - Style guides plug in as theme overrides
- ♿ **Accessible** - Proper ARIA labels, touch targets, and screen reader support
- 📱 **Cross-platform** - React Native + Web compatibility
- 📝 **Well-documented** - JSDoc type hints for IDE autocomplete

## Installation

```bash
npm install @appbuild/ui-foundation
```

### Peer Dependencies

```bash
npm install react react-native react-native-reanimated
```

## Quick Start

### 1. Wrap your app with the provider

```javascript
import { UIFoundationProvider } from '@appbuild/ui-foundation';

export default function App() {
  return (
    <UIFoundationProvider>
      <YourApp />
    </UIFoundationProvider>
  );
}
```

### 2. Use components

```javascript
import { Button, TextInput } from '@appbuild/ui-foundation';

function LoginScreen() {
  return (
    <>
      <TextInput
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        placeholder="••••••••"
        secureTextEntry
      />
      <Button variant="filled" color="primary">
        Sign In
      </Button>
    </>
  );
}
```

### 3. Access theme tokens

```javascript
import { useTheme } from '@appbuild/ui-foundation';

function CustomComponent() {
  const theme = useTheme();

  return (
    <View style={{
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.surface.primary,
      borderRadius: theme.radius.md,
    }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Hello World
      </Text>
    </View>
  );
}
```

## Theming

### Using a Style Guide

Install a theme package:

```bash
npm install @synthpunk/style-guide
```

Apply it:

```javascript
import { UIFoundationProvider } from '@appbuild/ui-foundation';
import { synthpunkTheme } from '@synthpunk/style-guide';

export default function App() {
  return (
    <UIFoundationProvider themeOverride={synthpunkTheme}>
      <YourApp />
    </UIFoundationProvider>
  );
}
```

### Creating a Custom Theme

```javascript
import { UIFoundationProvider, type ThemeOverride } from '@appbuild/ui-foundation';

const myTheme: ThemeOverride = {
  colors: {
    semantic: {
      primary: {
        main: '#FF6B6B',
        light: '#FF8E8E',
        dark: '#E85555',
        contrast: '#FFFFFF',
      },
    },
  },
  radius: {
    md: 16, // More rounded
  },
};

export default function App() {
  return (
    <UIFoundationProvider themeOverride={myTheme}>
      <YourApp />
    </UIFoundationProvider>
  );
}
```

## Components

### Atoms
- **Button** - Multiple variants (filled, outlined, ghost, soft) with haptic feedback
- More coming soon...

### Inputs
- **TextInput** - Full-featured text input with labels, errors, and icons
- More coming soon...

## Design Tokens

### Spacing
```javascript
spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 12px
spacing.lg   // 16px
spacing.xl   // 24px
// ... up to 5xl
```

### Colors
- Semantic colors: `primary`, `secondary`, `success`, `warning`, `error`, `info`
- Surface colors: `background`, `surface`, `text`, `border`
- Automatic light/dark mode support

### Typography
- Size scale: `xs` (11px) to `4xl` (40px)
- Text styles: `displayLarge`, `headlineMedium`, `bodyMedium`, `caption`, etc.
- Platform-native font families

### Elevation
Shadow tokens for depth hierarchy: `none`, `sm`, `md`, `lg`, `xl`

### Motion
Animation timing and springs for consistent motion

## API

### UIFoundationProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `themeOverride` | `ThemeOverride` | - | Custom theme tokens |
| `colorScheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Color scheme preference |
| `onColorSchemeChange` | `(scheme) => void` | - | Callback when scheme changes |

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'filled' \| 'outlined' \| 'ghost' \| 'soft'` | `'filled'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'` | `'primary'` | Color scheme |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable interactions |
| `fullWidth` | `boolean` | `false` | Fill container width |
| `leftIcon` | `ReactNode` | - | Icon before text |
| `rightIcon` | `ReactNode` | - | Icon after text |
| `haptics` | `boolean` | `true` | Enable haptic feedback |

### TextInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `helperText` | `string` | - | Helper text below input |
| `error` | `string` | - | Error message (shows error state) |
| `leftElement` | `ReactNode` | - | Element before input |
| `rightElement` | `ReactNode` | - | Element after input |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Show required indicator |

All other `TextInput` props from React Native are supported.

## Storybook

Explore all components and design tokens interactively:

```bash
# Run Storybook locally
npm run storybook

# Build for deployment
npm run build-storybook
```

Storybook includes:
- 📦 Interactive component playground
- 🎨 Complete design token showcase
- 🌓 Live light/dark theme switcher
- 📖 Full component documentation

See [STORYBOOK.md](./STORYBOOK.md) for detailed documentation.

## Documentation

- [Design Specification](./docs/DESIGN_SPEC.md) - Complete design philosophy and token system
- [Theming Guide](./docs/THEMING_GUIDE.md) - How to create custom themes
- [Storybook Guide](./STORYBOOK.md) - Component browser and interactive documentation

## License

MIT © Adam
