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

// Tactile Card Component - demonstrates dimensional depth on surfaces
const TactileCard = ({ children, style }) => {
  const theme = useTheme();
  const isDark = theme.mode === 'dark';

  // Get tactile tokens
  const tactileCard = isDark ? theme.tactile?.dark?.card : theme.tactile?.light?.card;
  const shadows = theme.tactile?.shadows;

  // Background tint for shadow depth effect
  const shadowBackground = tactileCard?.shadowBackground || (isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.02)');

  return (
    <View
      style={[
        styles.tactileCard,
        {
          backgroundColor: theme.colors.surface.primary,
          borderRadius: theme.radius.lg,
          // Tactile dimensional border
          borderWidth: 1,
          borderTopColor: tactileCard?.borderTop || (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.9)'),
          borderBottomColor: tactileCard?.borderBottom || (isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.1)'),
          borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
          borderRightColor: isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.04)',
        },
        // Card shadow for elevation
        isDark ? shadows?.cardDark : shadows?.cardLight,
        style,
      ]}
    >
      {/* Background tint for shadow depth */}
      <View
        style={[
          styles.shadowBackground,
          {
            backgroundColor: shadowBackground,
            borderRadius: theme.radius.lg,
          },
        ]}
      />

      {/* Top highlight edge */}
      <View
        style={[
          styles.cardTopHighlight,
          {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
            borderTopLeftRadius: theme.radius.lg - 1,
            borderTopRightRadius: theme.radius.lg - 1,
          },
        ]}
      />
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
            <View
              style={[
                styles.themeBadge,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.06)',
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(0, 0, 0, 0.1)',
                },
              ]}
            >
              <Text
                style={[
                  styles.themeBadgeText,
                  { color: theme.colors.text.secondary },
                ]}
              >
                {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </Text>
            </View>
          </View>
        </View>

        {/* Sign In Card - demonstrates tactile depth on cards */}
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

        {/* Status Cards */}
        <View style={styles.statusCards}>
          <View
            style={[
              styles.statusCard,
              {
                backgroundColor: isDark
                  ? theme.colors.semantic.success.main + '20'
                  : theme.colors.semantic.success.background,
                borderColor: isDark
                  ? theme.colors.semantic.success.main + '40'
                  : theme.colors.semantic.success.light,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>✅</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: isDark
                  ? theme.colors.semantic.success.light
                  : theme.colors.semantic.success.dark },
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
                  ? theme.colors.semantic.warning.main + '20'
                  : theme.colors.semantic.warning.background,
                borderColor: isDark
                  ? theme.colors.semantic.warning.main + '40'
                  : theme.colors.semantic.warning.light,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>⚠️</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: isDark
                  ? theme.colors.semantic.warning.light
                  : theme.colors.semantic.warning.dark },
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
                  ? theme.colors.semantic.error.main + '20'
                  : theme.colors.semantic.error.background,
                borderColor: isDark
                  ? theme.colors.semantic.error.main + '40'
                  : theme.colors.semantic.error.light,
              },
            ]}
          >
            <Text style={{ fontSize: 24 }}>❌</Text>
            <Text
              style={[
                styles.statusTitle,
                { color: isDark
                  ? theme.colors.semantic.error.light
                  : theme.colors.semantic.error.dark },
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
            Subtle dimensionality with light/shadow edges
          </Text>
          
          <View style={styles.buttonGrid}>
            <Button variant="filled" color="primary">Primary</Button>
            <Button variant="outlined" color="primary">Outlined</Button>
            <Button variant="ghost" color="secondary">Ghost</Button>
            <Button variant="soft" color="success">Soft</Button>
          </View>
        </TactileCard>

        {/* Tactile Design Principles */}
        <TactileCard style={{ marginBottom: 40 }}>
          <Text
            style={[
              styles.cardTitle,
              { color: theme.colors.text.primary },
              theme.textStyles.headlineMedium,
            ]}
          >
            Design Principles
          </Text>
          
          <View style={styles.principleList}>
            <View style={styles.principle}>
              <Text style={[styles.principleEmoji]}>🔲</Text>
              <View style={styles.principleContent}>
                <Text style={[styles.principleTitle, { color: theme.colors.text.primary }]}>
                  Dimensional Borders
                </Text>
                <Text style={[styles.principleDesc, { color: theme.colors.text.secondary }]}>
                  Top edges catch light, bottom edges are in shadow
                </Text>
              </View>
            </View>
            
            <View style={styles.principle}>
              <Text style={[styles.principleEmoji]}>💡</Text>
              <View style={styles.principleContent}>
                <Text style={[styles.principleTitle, { color: theme.colors.text.primary }]}>
                  Raised vs Recessed
                </Text>
                <Text style={[styles.principleDesc, { color: theme.colors.text.secondary }]}>
                  Buttons are raised (light top), inputs are recessed (dark top)
                </Text>
              </View>
            </View>
            
            <View style={styles.principle}>
              <Text style={[styles.principleEmoji]}>🎨</Text>
              <View style={styles.principleContent}>
                <Text style={[styles.principleTitle, { color: theme.colors.text.primary }]}>
                  Neutral Foundation
                </Text>
                <Text style={[styles.principleDesc, { color: theme.colors.text.secondary }]}>
                  No opinionated colors — themes applied per project
                </Text>
              </View>
            </View>
          </View>
        </TactileCard>
      </View>
    </ScrollView>
  );
};

// Light Mode Story
export const LightMode = {
  render: () => (
    <UIFoundationProvider colorScheme="light">
      <DemoApp />
    </UIFoundationProvider>
  ),
};

// Dark Mode Story
export const DarkMode = {
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
        <View style={[styles.panelHeader, { backgroundColor: '#F5F5F5', borderBottomColor: '#E0E0E0' }]}>
          <Text style={[styles.panelTitle, { color: '#212121' }]}>☀️ Light Mode</Text>
        </View>
        <UIFoundationProvider colorScheme="light">
          <DemoApp />
        </UIFoundationProvider>
      </View>
      <View style={[styles.sideBySideDivider]} />
      <View style={styles.sideBySidePanel}>
        <View style={[styles.panelHeader, { backgroundColor: '#1E1E1E', borderBottomColor: '#333' }]}>
          <Text style={[styles.panelTitle, { color: '#FAFAFA' }]}>🌙 Dark Mode</Text>
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
        <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 8, color: '#212121' }}>
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
    gap: 32,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    marginHorizontal: -24,
    marginTop: -24,
    marginBottom: 0,
  },
  headerTitle: {
    marginBottom: 12,
  },
  headerSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  headerSubtitle: {
    flex: 1,
    minWidth: 150,
    marginRight: 8,
  },
  themeBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  themeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Tactile card styles
  tactileCard: {
    padding: 24,
    gap: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  shadowBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  cardTopHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  cardTitle: {
    marginBottom: 6,
  },
  cardDescription: {
    marginBottom: 12,
  },
  form: {
    gap: 20,
    marginTop: 12,
  },
  statusCards: {
    flexDirection: 'row',
    gap: 16,
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
    gap: 16,
    marginTop: 12,
  },
  // Principles section
  principleList: {
    gap: 20,
    marginTop: 12,
  },
  principle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  principleEmoji: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  principleContent: {
    flex: 1,
  },
  principleTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  principleDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  // Side by side
  sideBySide: {
    flexDirection: 'row',
    height: '100vh',
  },
  sideBySidePanel: {
    flex: 1,
    overflow: 'hidden',
  },
  sideBySideDivider: {
    width: 2,
    backgroundColor: '#333',
  },
  panelHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
