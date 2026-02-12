import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../providers';
import { spacing, palette, semanticColors, typography, textStyles, radius, motion } from './index';

const meta = {
  title: 'Design Tokens/All Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
// type Story = StoryObj<typeof meta>;

// Color Swatch Component
const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <View style={styles.colorSwatch}>
    <View style={[styles.colorBox, { backgroundColor: color }]} />
    <View>
      <Text style={styles.colorName}>{name}</Text>
      <Text style={styles.colorValue}>{color}</Text>
    </View>
  </View>
);

// Colors Story
export const Colors= {
  render: () => {
    const theme = useTheme();
    
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Semantic Colors</Text>
        <View style={styles.grid}>
          <View style={styles.colorGroup}>
            <Text style={styles.groupTitle}>Primary</Text>
            <ColorSwatch color={semanticColors.primary.light} name="Light" />
            <ColorSwatch color={semanticColors.primary.main} name="Main" />
            <ColorSwatch color={semanticColors.primary.dark} name="Dark" />
          </View>

          <View style={styles.colorGroup}>
            <Text style={styles.groupTitle}>Secondary</Text>
            <ColorSwatch color={semanticColors.secondary.light} name="Light" />
            <ColorSwatch color={semanticColors.secondary.main} name="Main" />
            <ColorSwatch color={semanticColors.secondary.dark} name="Dark" />
          </View>

          <View style={styles.colorGroup}>
            <Text style={styles.groupTitle}>Success</Text>
            <ColorSwatch color={semanticColors.success.light} name="Light" />
            <ColorSwatch color={semanticColors.success.main} name="Main" />
            <ColorSwatch color={semanticColors.success.dark} name="Dark" />
          </View>

          <View style={styles.colorGroup}>
            <Text style={styles.groupTitle}>Error</Text>
            <ColorSwatch color={semanticColors.error.light} name="Light" />
            <ColorSwatch color={semanticColors.error.main} name="Main" />
            <ColorSwatch color={semanticColors.error.dark} name="Dark" />
          </View>

          <View style={styles.colorGroup}>
            <Text style={styles.groupTitle}>Warning</Text>
            <ColorSwatch color={semanticColors.warning.light} name="Light" />
            <ColorSwatch color={semanticColors.warning.main} name="Main" />
            <ColorSwatch color={semanticColors.warning.dark} name="Dark" />
          </View>

          <View style={styles.colorGroup}>
            <Text style={styles.groupTitle}>Info</Text>
            <ColorSwatch color={semanticColors.info.light} name="Light" />
            <ColorSwatch color={semanticColors.info.main} name="Main" />
            <ColorSwatch color={semanticColors.info.dark} name="Dark" />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Gray Palette</Text>
        <View style={styles.paletteRow}>
          {Object.entries(palette.gray).map(([name, color]) => (
            <View key={name} style={styles.paletteItem}>
              <View style={[styles.paletteBox, { backgroundColor: color }]} />
              <Text style={styles.paletteName}>{name}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Surface Colors (Current Theme)</Text>
        <View style={styles.grid}>
          <ColorSwatch color={theme.colors.background.primary} name="Background Primary" />
          <ColorSwatch color={theme.colors.background.secondary} name="Background Secondary" />
          <ColorSwatch color={theme.colors.background.tertiary} name="Background Tertiary" />
          <ColorSwatch color={theme.colors.surface.primary} name="Surface Primary" />
          <ColorSwatch color={theme.colors.surface.secondary} name="Surface Secondary" />
          <ColorSwatch color={theme.colors.surface.elevated} name="Surface Elevated" />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Text Colors (Current Theme)</Text>
        <View style={styles.grid}>
          <ColorSwatch color={theme.colors.text.primary} name="Text Primary" />
          <ColorSwatch color={theme.colors.text.secondary} name="Text Secondary" />
          <ColorSwatch color={theme.colors.text.tertiary} name="Text Tertiary" />
        </View>
      </View>
    );
  },
};

// Spacing Story
export const Spacing= {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Spacing Scale (4px base)</Text>
      <View style={styles.spacingList}>
        {Object.entries(spacing).map(([name, value]) => (
          <View key={name} style={styles.spacingRow}>
            <Text style={styles.tokenName}>{name}</Text>
            <View style={styles.spacingVisualization}>
              <View
                style={[
                  styles.spacingBox,
                  { width: value === 0 ? 2 : value, height: 40 },
                ]}
              />
              <Text style={styles.tokenValue}>{value}px</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Typography Story
export const Typography= {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Font Sizes</Text>
      <View style={styles.typographyList}>
        {Object.entries(typography.fontSize).map(([name, size]) => (
          <View key={name} style={styles.typographyRow}>
            <View style={styles.typographyLabel}>
              <Text style={styles.tokenName}>{name}</Text>
              <Text style={styles.tokenValue}>{size}px</Text>
            </View>
            <Text style={[styles.typographyExample, { fontSize: size }]}>
              The quick brown fox jumps
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Font Weights</Text>
      <View style={styles.typographyList}>
        {Object.entries(typography.fontWeight).map(([name, weight]) => (
          <View key={name} style={styles.typographyRow}>
            <View style={styles.typographyLabel}>
              <Text style={styles.tokenName}>{name}</Text>
              <Text style={styles.tokenValue}>{weight}</Text>
            </View>
            <Text style={[styles.typographyExample, { fontWeight: weight as any }]}>
              The quick brown fox jumps
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Text Styles</Text>
      <View style={styles.typographyList}>
        {Object.entries(textStyles).map(([name, style]) => (
          <View key={name} style={styles.typographyRow}>
            <Text style={styles.tokenName}>{name}</Text>
            <Text style={[styles.typographyExample, style as any]}>
              The quick brown fox jumps over the lazy dog
            </Text>
          </View>
        ))}
      </View>
    </View>
  ),
};

// Radius Story
export const BorderRadius= {
  render: () => {
    const theme = useTheme();
    
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        <View style={styles.radiusList}>
          {Object.entries(radius).map(([name, value]) => (
            <View key={name} style={styles.radiusRow}>
              <View style={styles.radiusLabel}>
                <Text style={styles.tokenName}>{name}</Text>
                <Text style={styles.tokenValue}>
                  {value === 9999 ? 'full' : `${value}px`}
                </Text>
              </View>
              <View
                style={[
                  styles.radiusBox,
                  {
                    borderRadius: value,
                    backgroundColor: theme.colors.semantic.primary.main,
                  },
                ]}
              />
            </View>
          ))}
        </View>
      </View>
    );
  },
};

// Motion Story
export const Motion= {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Animation Durations</Text>
      <View style={styles.motionList}>
        {Object.entries(motion.duration).map(([name, value]) => (
          <View key={name} style={styles.motionRow}>
            <Text style={styles.tokenName}>{name}</Text>
            <Text style={styles.tokenValue}>{value}ms</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Easing Functions</Text>
      <View style={styles.motionList}>
        {Object.entries(motion.easing).map(([name, value]) => (
          <View key={name} style={styles.motionRow}>
            <Text style={styles.tokenName}>{name}</Text>
            <Text style={styles.tokenValueSmall}>{value}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Spring Configs</Text>
      <View style={styles.motionList}>
        {Object.entries(motion.spring).map(([name, config]) => (
          <View key={name} style={styles.motionRow}>
            <Text style={styles.tokenName}>{name}</Text>
            <Text style={styles.tokenValueSmall}>
              damping: {config.damping}, stiffness: {config.stiffness}
            </Text>
          </View>
        ))}
      </View>
    </View>
  ),
};

// All Tokens Overview
export const AllTokens= {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.title}>Design Tokens Overview</Text>
      
      <View style={styles.overviewSection}>
        <Text style={styles.overviewTitle}>📦 Available Token Categories</Text>
        
        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Colors</Text>
          <Text style={styles.categoryDescription}>
            Semantic colors, grays, surfaces, text, and borders
          </Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Spacing</Text>
          <Text style={styles.categoryDescription}>
            4px-based spacing scale from 2px to 96px
          </Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Typography</Text>
          <Text style={styles.categoryDescription}>
            Font sizes, weights, line heights, and preset text styles
          </Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Border Radius</Text>
          <Text style={styles.categoryDescription}>
            Consistent rounding from subtle to full circles
          </Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>Motion</Text>
          <Text style={styles.categoryDescription}>
            Durations, easing functions, and spring configurations
          </Text>
        </View>
      </View>

      <Text style={styles.overviewNote}>
        💡 Use the toolbar above to switch between light and dark themes
      </Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorGroup: {
    minWidth: 200,
    gap: 8,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  colorSwatch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorName: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorValue: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  paletteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paletteItem: {
    alignItems: 'center',
    gap: 4,
  },
  paletteBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  paletteName: {
    fontSize: 11,
    color: '#666',
  },
  spacingList: {
    gap: 12,
  },
  spacingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  spacingVisualization: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  spacingBox: {
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  tokenName: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  tokenValue: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  tokenValueSmall: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  typographyList: {
    gap: 16,
  },
  typographyRow: {
    gap: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  typographyLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typographyExample: {
    marginTop: 4,
  },
  radiusList: {
    gap: 16,
  },
  radiusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  radiusLabel: {
    gap: 4,
  },
  radiusBox: {
    width: 80,
    height: 80,
  },
  motionList: {
    gap: 12,
  },
  motionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  overviewSection: {
    gap: 16,
    marginTop: 24,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryCard: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    gap: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
  },
  overviewNote: {
    marginTop: 32,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
