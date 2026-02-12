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

/**
 * TactileCard - Demonstrates the polished, native-feeling card with depth
 */
const TactileCard = ({ children, style }) => {
  const theme = useTheme();
  const isDark = theme.mode === 'dark';
  
  // Tactile shadow and border treatment
  const cardShadow = isDark
    ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 4,
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radius.lg,
          // Tactile border: top lighter, bottom darker for 3D effect
          borderWidth: 1,
          borderTopColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)',
          borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.5)',
          borderRightColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.04)',
          borderBottomColor: isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)',
        },
        cardShadow,
        style,
      ]}
    >
      {children}
    </View>
  );
};

// Demo App Component
const DemoApp = () => {
  const theme = useTheme();
  const isDark = theme.mode === 'dark';
  
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.primary },
      ]}
    >
      <View style={styles.content}>
        {/* Header - Fixed layout with proper spacing */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.surface.primary,
              borderBottomColor: theme.colors.border.default,
              // Subtle bottom shadow for depth
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: isDark ? 0.3 : 0.05,
              shadowRadius: 4,
              elevation: 2,
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
          <View style={styles.headerSubtitleContainer}>
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
          <View style={styles.headerBadge}>
            <Text style={[
              styles.badgeText,
              { 
                color: isDark ? theme.colors.semantic.primary.light : theme.colors.semantic.primary.main,
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)',
              }
            ]}>
              {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Text>
          </View>
        </View>

        {/* Sign In Card with Tactile Depth */}
        <TactileCard>
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
        </TactileCard>

        {/* Status Cards with Theme-Specific Styling */}
        <View style={styles.statusCards}>
          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: isDark 
                  ? 'rgba(22, 163, 74, 0.15)' 
                  : theme.colors.semantic.success.background,
                borderColor: isDark
                  ? 'rgba(34, 197, 94, 0.3)'
                  : theme.colors.semantic.success.light,
                // Tactile borders
                borderTopColor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                borderBottomColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>✅</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: isDark ? theme.colors.semantic.success.light : theme.colors.semantic.success.dark },
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
                backgroundColor: isDark
                  ? 'rgba(202, 138, 4, 0.15)'
                  : theme.colors.semantic.warning.background,
                borderColor: isDark
                  ? 'rgba(234, 179, 8, 0.3)'
                  : theme.colors.semantic.warning.light,
                borderTopColor: isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                borderBottomColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>⚠️</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: isDark ? theme.colors.semantic.warning.light : theme.colors.semantic.warning.dark },
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
                backgroundColor: isDark
                  ? 'rgba(220, 38, 38, 0.15)'
                  : theme.colors.semantic.error.background,
                borderColor: isDark
                  ? 'rgba(239, 68, 68, 0.3)'
                  : theme.colors.semantic.error.light,
                borderTopColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.8)',
                borderBottomColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>❌</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: isDark ? theme.colors.semantic.error.light : theme.colors.semantic.error.dark },
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
        <TactileCard>
          <Text
            style={[
              styles.cardTitle,
              { color: theme.colors.text.primary },
              theme.textStyles.headlineMedium,
            ]}
          >
            Tactile Buttons
          </Text>
          <Text
            style={[
              styles.cardDescription,
              { color: theme.colors.text.secondary },
              theme.textStyles.bodySmall,
            ]}
          >
            Notice the subtle 3D depth - borders with gradients, shadows, and highlights
          </Text>
          
          <View style={styles.buttonGrid}>
            <Button variant="filled" color="primary">Primary</Button>
            <Button variant="outlined" color="primary">Outlined</Button>
            <Button variant="ghost" color="secondary">Ghost</Button>
            <Button variant="soft" color="success">Soft</Button>
          </View>
        </TactileCard>

        {/* Input Showcase */}
        <TactileCard>
          <Text
            style={[
              styles.cardTitle,
              { color: theme.colors.text.primary },
              theme.textStyles.headlineMedium,
            ]}
          >
            Tactile Inputs
          </Text>
          <Text
            style={[
              styles.cardDescription,
              { color: theme.colors.text.secondary },
              theme.textStyles.bodySmall,
            ]}
          >
            Inset shadows when idle, glow effects on focus
          </Text>
          
          <View style={styles.form}>
            <TextInput
              label="Default Input"
              placeholder="Click to see focus glow"
            />
            <TextInput
              label="With Helper"
              placeholder="Enter something..."
              helperText="This is helper text below the input"
            />
            <TextInput
              label="Error State"
              placeholder="Invalid input"
              error="This field has an error"
            />
          </View>
        </TactileCard>
      </View>
    </ScrollView>
  );
};

// Light Theme Story
export const LightTheme = {
  render: () => (
    <UIFoundationProvider colorScheme="light">
      <DemoApp />
    </UIFoundationProvider>
  ),
};

// Dark Theme Story
export const DarkTheme = {
  render: () => (
    <UIFoundationProvider colorScheme="dark">
      <DemoApp />
    </UIFoundationProvider>
  ),
};

// Side by Side Comparison
export const SideBySide = {
  render: () => (
    <View style={styles.sideBySide}>
      <View style={styles.sideBySidePanel}>
        <View style={[styles.panelHeader, { backgroundColor: '#F8FAFC', borderBottomColor: '#E2E8F0' }]}>
          <Text style={[styles.panelTitle, { color: '#1E293B' }]}>☀️ Light Theme</Text>
        </View>
        <UIFoundationProvider colorScheme="light">
          <DemoApp />
        </UIFoundationProvider>
      </View>
      <View style={[styles.sideBySidePanel, { borderLeftWidth: 1, borderLeftColor: '#374151' }]}>
        <View style={[styles.panelHeader, { backgroundColor: '#1E293B', borderBottomColor: '#374151' }]}>
          <Text style={[styles.panelTitle, { color: '#F1F5F9' }]}>🌙 Dark Theme</Text>
        </View>
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
export const CustomTheme = {
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
      <View style={{ padding: 40, backgroundColor: '#FAFAFA', minHeight: '100vh' }}>
        <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8, color: '#1E293B' }}>
          Custom Theme Override
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 24, color: '#64748B' }}>
          Primary color overridden to orange - notice the tactile depth is preserved
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
    marginBottom: 8,
  },
  headerTitle: {
    marginBottom: 8,
  },
  headerSubtitleContainer: {
    marginBottom: 12,
  },
  headerSubtitle: {
    lineHeight: 20,
  },
  headerBadge: {
    flexDirection: 'row',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    padding: 24,
    gap: 12,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardDescription: {
    marginBottom: 8,
  },
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
    borderRadius: 12,
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
    marginTop: 8,
  },
  sideBySide: {
    flexDirection: 'row',
    minHeight: '100vh',
  },
  sideBySidePanel: {
    flex: 1,
    overflow: 'auto',
  },
  panelHeader: {
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});
