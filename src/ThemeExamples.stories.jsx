import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { UIFoundationProvider, useTheme } from './providers/index.jsx';
import { Button } from './components/atoms/Button/index.js';
import { TextInput } from './components/inputs/TextInput/index.js';

/** @type {import('@storybook/react').Meta} */
const meta = {
  title: 'Theming/Theme Examples',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// Demo App Component
const DemoApp = () => {
  const theme = useTheme();
  
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.primary },
      ]}
    >
      <View style={styles.content}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.surface.primary,
              borderBottomColor: theme.colors.border.default,
            },
          ]}
        >
          <Text
            style={[
              styles.headerTitle,
              { color: theme.colors.text.primary },
              theme.textStyles.headlineLarge,
            ]}
          >
            Theme Demo
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              { color: theme.colors.text.secondary },
              theme.textStyles.bodySmall,
            ]}
          >
            Polished, native-feeling UI
          </Text>
        </View>

        {/* Card Section */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.default,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: theme.colors.text.primary },
              theme.textStyles.headlineMedium,
            ]}
          >
            Sign In
          </Text>
          <Text
            style={[
              styles.cardDescription,
              { color: theme.colors.text.secondary },
              theme.textStyles.bodyMedium,
            ]}
          >
            Enter your credentials to continue
          </Text>

          <View style={styles.form}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
            />
            <TextInput
              label="Password"
              placeholder="••••••••"
              secureTextEntry
            />
            
            <Button
              variant="filled"
              color="primary"
              fullWidth
              style={{ marginTop: 8 }}
            >
              Sign In
            </Button>
            
            <Button
              variant="ghost"
              color="secondary"
              fullWidth
              style={{ marginTop: 8 }}
            >
              Forgot Password?
            </Button>
          </View>
        </View>

        {/* Status Cards */}
        <View style={styles.statusCards}>
          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: theme.colors.semantic.success.background,
                borderColor: theme.colors.semantic.success.light,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>✅</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: theme.colors.semantic.success.dark },
              ]}
            >
              Success
            </Text>
            <Text
              style={[
                styles.statusText,
                { color: theme.colors.semantic.success.main },
              ]}
            >
              Operation completed
            </Text>
          </View>

          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: theme.colors.semantic.warning.background,
                borderColor: theme.colors.semantic.warning.light,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>⚠️</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: theme.colors.semantic.warning.dark },
              ]}
            >
              Warning
            </Text>
            <Text
              style={[
                styles.statusText,
                { color: theme.colors.semantic.warning.main },
              ]}
            >
              Review required
            </Text>
          </View>

          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: theme.colors.semantic.error.background,
                borderColor: theme.colors.semantic.error.light,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>❌</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: theme.colors.semantic.error.dark },
              ]}
            >
              Error
            </Text>
            <Text
              style={[
                styles.statusText,
                { color: theme.colors.semantic.error.main },
              ]}
            >
              Action failed
            </Text>
          </View>
        </View>

        {/* Button Showcase */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.default,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: theme.colors.text.primary },
              theme.textStyles.headlineMedium,
            ]}
          >
            Buttons
          </Text>
          
          <View style={styles.buttonGrid}>
            <Button variant="filled" color="primary">Primary</Button>
            <Button variant="outlined" color="primary">Outlined</Button>
            <Button variant="ghost" color="secondary">Ghost</Button>
            <Button variant="soft" color="success">Soft</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// Light Theme Story
export const LightTheme= {
  render: () => (
    <UIFoundationProvider colorScheme="light">
      <DemoApp />
    </UIFoundationProvider>
  ),
};

// Dark Theme Story
export const DarkTheme= {
  render: () => (
    <UIFoundationProvider colorScheme="dark">
      <DemoApp />
    </UIFoundationProvider>
  ),
};

// Side by Side Comparison
export const SideBySide= {
  render: () => (
    <View style={styles.sideBySide}>
      <View style={styles.sideBySidePanel}>
        <Text style={styles.panelTitle}>Light Theme</Text>
        <UIFoundationProvider colorScheme="light">
          <DemoApp />
        </UIFoundationProvider>
      </View>
      <View style={styles.sideBySidePanel}>
        <Text style={styles.panelTitle}>Dark Theme</Text>
        <UIFoundationProvider colorScheme="dark">
          <DemoApp />
        </UIFoundationProvider>
      </View>
    </View>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Theme Override Example
export const CustomTheme= {
  render: () => (
    <UIFoundationProvider
      colorScheme="light"
      themeOverride={{
        colors: {
          semantic: {
            primary: {
              main: '#FF6B35', // Orange
              light: '#FF8C61',
              dark: '#E85A2B',
              contrast: '#FFFFFF',
            },
          },
        },
      }}
    >
      <View style={{ padding: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 24 }}>
          Custom Theme Override
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 24, color: '#666' }}>
          Primary color overridden to orange
        </Text>
        <View style={{ gap: 12 }}>
          <Button variant="filled" color="primary">
            Custom Primary
          </Button>
          <Button variant="outlined" color="primary">
            Custom Outlined
          </Button>
          <Button variant="soft" color="primary">
            Custom Soft
          </Button>
        </View>
      </View>
    </UIFoundationProvider>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 24,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    marginHorizontal: -24,
    marginTop: -24,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {},
  card: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardDescription: {},
  form: {
    gap: 16,
    marginTop: 8,
  },
  statusCards: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  statusCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sideBySide: {
    flexDirection: 'row',
    height: '100vh',
  },
  sideBySidePanel: {
    flex: 1,
    overflow: 'auto',
  },
  panelTitle: {
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
