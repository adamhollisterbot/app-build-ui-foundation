# Storybook Documentation

Visual component browser and interactive documentation for the UI Foundation library.

## 🚀 Quick Start

### Running Storybook Locally

```bash
npm run storybook
```

This will start the Storybook development server at `http://localhost:6006`

### Building for Deployment

```bash
npm run build-storybook
```

This creates a static build in the `storybook-static/` directory that can be deployed to any static hosting service.

## 📚 What's Included

### Component Stories

**Button** (`src/components/atoms/Button/Button.stories.jsx`)
- All 4 variants: filled, outlined, ghost, soft
- All 3 sizes: small, medium, large
- All 5 color schemes: primary, secondary, success, error, warning
- States: disabled, loading, with icons
- Interactive playground with full prop controls

**TextInput** (`src/components/inputs/TextInput/TextInput.stories.jsx`)
- Basic input variations
- With label, helper text, and error states
- With left/right elements
- Disabled and required states
- Full form examples
- Interactive playground

### Design Tokens

**Tokens Showcase** (`src/tokens/Tokens.stories.jsx`)

Comprehensive visual documentation of all design tokens:

- **Colors**: Semantic colors, gray palette, surface colors, text colors
- **Spacing**: Full spacing scale with visual measurements
- **Typography**: Font sizes, weights, line heights, and preset text styles
- **Border Radius**: All radius tokens with examples
- **Motion**: Animation durations, easing functions, and spring configs

### Theme Examples

**Theme System** (`src/ThemeExamples.stories.jsx`)

- Light theme demo app
- Dark theme demo app
- Side-by-side theme comparison
- Custom theme override example
- Full app-like layouts showing theming in action

## 🎨 Using the Theme Switcher

Storybook includes a **theme switcher** in the toolbar:

1. Look for the theme icon in the top toolbar
2. Click to toggle between light and dark themes
3. All stories will automatically update to reflect the selected theme

This demonstrates how components adapt to different themes using the `UIFoundationProvider`.

## ✍️ Adding Stories for New Components

When you create a new component, add a corresponding `.stories.jsx` file:

### File Structure

```
src/
  components/
    YourComponent/
      YourComponent.jsx
      YourComponent.stories.jsx  ← Add this
      index.js
```

### Basic Story Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered', // or 'padded' or 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for your props
    variant: {
      control: 'select',
      options: ['option1', 'option2'],
      description: 'Visual variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    // Default prop values
  },
};

// Variants
export const Variant1: Story = {
  args: {
    variant: 'option1',
  },
};

// Custom render for complex examples
export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <YourComponent variant="option1" />
      <YourComponent variant="option2" />
    </View>
  ),
};
```

### Story Best Practices

1. **Use descriptive names** - Make story names clear and searchable
2. **Show all variants** - Create stories for each major variation
3. **Include edge cases** - Show disabled, loading, error states
4. **Add comparisons** - Use render functions to show multiple variations side-by-side
5. **Document props** - Use argTypes to document each prop with descriptions
6. **Interactive playground** - Always include a "Playground" story with all controls enabled

## 📖 Documenting Design Tokens

When adding new design tokens:

1. Add the token to the appropriate file in `src/tokens/`
2. Update `src/tokens/Tokens.stories.jsx` to showcase the new token
3. Use the existing patterns (color swatches, spacing visualizations, etc.)
4. Add helpful descriptions and use cases

### Token Documentation Pattern

```tsx
export const NewTokenCategory: Story = {
  render: () => {
    const theme = useTheme();
    
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>New Token Category</Text>
        <View style={styles.list}>
          {Object.entries(newTokens).map(([name, value]) => (
            <View key={name} style={styles.row}>
              <Text style={styles.tokenName}>{name}</Text>
              <View style={styles.visualization}>
                {/* Visual representation */}
              </View>
              <Text style={styles.tokenValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  },
};
```

## 🎯 Tips for Great Stories

### Use Real Content

Don't use "Lorem ipsum" - use realistic text that demonstrates the native-feeling design:

```tsx
// ❌ Bad
<Button>Click me</Button>

// ✅ Good
<Button>Continue</Button>
<Button>Add to Cart</Button>
<Button>Sign In</Button>
```

### Show Component Behavior

Demonstrate interactive behavior where relevant:

```tsx
export const InteractiveExample: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Type something..."
      />
    );
  },
};
```

### Group Related Stories

Use the `title` property to organize stories:

```tsx
// Groups under "Components/Forms/"
title: 'Components/Forms/TextInput'

// Groups under "Design Tokens/"
title: 'Design Tokens/Colors'
```

## 🚢 Deployment

The built Storybook (`storybook-static/`) can be deployed to:

- **GitHub Pages** - Use the `gh-pages` package
- **Vercel** - Drag and drop the build folder
- **Netlify** - Connect to your repo
- **AWS S3** - Upload as static website
- **Any static hosting** - Just upload the files

### Example: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
"scripts": {
  "deploy-storybook": "npm run build-storybook && gh-pages -d storybook-static"
}

# Deploy
npm run deploy-storybook
```

## 🔧 Configuration

Storybook configuration files:

- `.storybook/main.js` - Main configuration (webpack, addons, etc.)
- `.storybook/preview.jsx` - Global decorators, parameters, theme switcher

### Customizing the Theme Switcher

The theme switcher is configured in `.storybook/preview.jsx`:

```tsx
globalTypes: {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Light' },
        { value: 'dark', icon: 'circle', title: 'Dark' },
      ],
    },
  },
},
```

## 📝 Writing Good Documentation

Use MDX files for rich documentation pages:

```mdx
# Component Name

Brief description of the component and its purpose.

## Usage

\```tsx
import { Component } from '@appbuild/ui-foundation';

<Component prop="value" />
\```

## Props

<ArgsTable of={Component} />

## Examples

<Canvas>
  <Story id="component--default" />
</Canvas>
```

## 🐛 Troubleshooting

**Storybook won't start**
- Check that all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules/.cache`

**Components not rendering**
- Ensure `UIFoundationProvider` is wrapping components in preview.jsx
- Check that react-native-web aliases are configured in main.js

**Theme switcher not working**
- Verify the decorator in preview.jsx is passing the colorScheme prop
- Check that components are using `useTheme()` hook

## 📚 Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Controls Addon](https://storybook.js.org/docs/react/essentials/controls)

---

**Happy documenting! 🎉**
