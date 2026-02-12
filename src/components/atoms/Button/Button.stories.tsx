import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { View, Text } from 'react-native';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost', 'soft'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning'],
      description: 'Color scheme',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    haptics: {
      control: 'boolean',
      description: 'Enable haptic feedback',
    },
  },
};

export default meta;
// type Story = StoryObj<typeof meta>;

// Basic variants
export const Filled= {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
};

export const Outlined= {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Ghost= {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Soft= {
  args: {
    children: 'Soft Button',
    variant: 'soft',
  },
};

// Sizes
export const Small= {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium= {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large= {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Colors
export const AllColors= {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="error">Error</Button>
      <Button color="warning">Warning</Button>
    </View>
  ),
};

// States
export const Disabled= {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading= {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const FullWidth= {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// With Icons/Elements
export const WithLeftIcon= {
  args: {
    children: 'Download',
    leftIcon: <Text style={{ fontSize: 18 }}>⬇️</Text>,
  },
};

export const WithRightIcon= {
  args: {
    children: 'Continue',
    rightIcon: <Text style={{ fontSize: 18 }}>→</Text>,
  },
};

export const WithBothIcons= {
  args: {
    children: 'Share',
    leftIcon: <Text style={{ fontSize: 18 }}>📤</Text>,
    rightIcon: <Text style={{ fontSize: 18 }}>✨</Text>,
  },
};

// Variant Comparison
export const AllVariants= {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button variant="filled">Filled Button</Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="soft">Soft Button</Button>
    </View>
  ),
};

// Size Comparison
export const AllSizes= {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </View>
  ),
};

// Interactive Playground
export const Playground= {
  args: {
    children: 'Interactive Button',
    variant: 'filled',
    size: 'md',
    color: 'primary',
    disabled: false,
    loading: false,
    fullWidth: false,
    haptics: true,
  },
};
