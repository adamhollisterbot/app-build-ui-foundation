import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { View, Text } from 'react-native';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    error: {
      control: 'text',
      description: 'Error message (shows error state)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required indicator',
    },
  },
};

export default meta;
// type Story = StoryObj<typeof meta>;

// Basic Input
export const Basic= {
  args: {
    placeholder: 'Enter text...',
  },
};

// With Label
export const WithLabel= {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

// With Helper Text
export const WithHelperText= {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Choose a unique username',
  },
};

// Error State
export const WithError= {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

// Disabled State
export const Disabled= {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Disabled value',
  },
};

// Required Field
export const Required= {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    required: true,
    secureTextEntry: true,
  },
};

// With Left Element
export const WithLeftElement= {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftElement: <Text style={{ fontSize: 18 }}>🔍</Text>,
  },
};

// With Right Element
export const WithRightElement= {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    secureTextEntry: true,
    rightElement: <Text style={{ fontSize: 18 }}>👁️</Text>,
  },
};

// With Both Elements
export const WithBothElements= {
  args: {
    label: 'Price',
    placeholder: '0.00',
    leftElement: <Text style={{ fontSize: 16 }}>$</Text>,
    rightElement: <Text style={{ fontSize: 16, color: '#666' }}>USD</Text>,
  },
};

// All States Comparison
export const AllStates= {
  render: () => (
    <View style={{ gap: 24, width: 400 }}>
      <TextInput label="Normal" placeholder="Enter text..." />
      <TextInput
        label="With Value"
        value="Hello world"
        placeholder="Enter text..."
      />
      <TextInput
        label="Focused (simulated)"
        placeholder="Enter text..."
        autoFocus
      />
      <TextInput
        label="Error"
        value="invalid"
        error="This field has an error"
      />
      <TextInput
        label="Disabled"
        value="Cannot edit"
        disabled
      />
    </View>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Form Example
export const FormExample= {
  render: () => (
    <View style={{ gap: 20, width: 400 }}>
      <TextInput
        label="Full Name"
        placeholder="John Doe"
        required
      />
      <TextInput
        label="Email"
        placeholder="you@example.com"
        helperText="We'll never share your email"
        required
      />
      <TextInput
        label="Phone"
        placeholder="+1 (555) 000-0000"
        leftElement={<Text style={{ fontSize: 16 }}>📱</Text>}
      />
      <TextInput
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        required
        rightElement={<Text style={{ fontSize: 18 }}>👁️</Text>}
      />
    </View>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interactive Playground
export const Playground= {
  args: {
    label: 'Interactive Input',
    placeholder: 'Type something...',
    helperText: 'This is a helper text',
    disabled: false,
    required: false,
  },
  parameters: {
    layout: 'padded',
  },
};
