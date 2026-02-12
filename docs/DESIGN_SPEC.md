# Design Specification

## Philosophy: Polished, Native-Feeling Design

The UI Foundation embodies these core principles:

### Native-Feeling

Components behave as users expect on each platform:
- iOS components have iOS affordances (swipe gestures, bounce effects)
- Android components respect Material guidelines where appropriate
- Touch targets meet platform minimums (44pt iOS, 48dp Android)
- Animations match platform conventions

### Polished

Quality is evident in every detail:
- Smooth animations at 60fps
- Proper loading states (never show blank screens)
- Clear visual hierarchy
- Consistent spacing rhythm
- Thoughtful micro-interactions
- Accessible by default

## Token System

### Spacing Scale

Based on a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `2xs` | 2px | Hairline spacing |
| `xs` | 4px | Tight spacing, inline icon padding |
| `sm` | 8px | Button padding, compact lists |
| `md` | 12px | Card padding, list items |
| `lg` | 16px | Screen margins, section headers |
| `xl` | 24px | Between major sections |
| `2xl` | 32px | Loose spacing |
| `3xl` | 48px | Section spacing |
| `4xl` | 64px | Large sections |
| `5xl` | 96px | Hero spacing |

**Guideline:** Use the scale consistently. Skip values only for optical adjustments.

### Color System

#### Surface Colors (Light Mode)
- `background.primary` - Main app background (#FFFFFF)
- `background.secondary` - Subtle backgrounds (#FAFAFA)
- `background.tertiary` - Disabled states (#F5F5F5)
- `surface.primary` - Card backgrounds (#FFFFFF)
- `surface.elevated` - Raised cards (#FFFFFF)
- `text.primary` - Main text (#212121)
- `text.secondary` - Supporting text (#757575)
- `text.tertiary` - Placeholder text (#BDBDBD)
- `border.default` - Default borders (#EEEEEE)

#### Semantic Colors
- `primary` - Main brand color (default: Blue)
- `secondary` - Accent color (default: Violet)
- `success` - Positive actions (Green)
- `warning` - Caution (Yellow)
- `error` - Destructive actions (Red)
- `info` - Informational (Cyan)

Each semantic color has:
- `main` - Primary shade
- `light` - Hover/active state
- `dark` - Pressed state
- `contrast` - Text on colored background
- `background` - Subtle backgrounds (status colors only)

**Theming:** Style guides override semantic colors only. Surface colors adjust automatically for dark mode.

### Typography

#### Font Scale

| Token | Size | Usage |
|-------|------|-------|
| `xs` | 11px | Tiny labels, metadata |
| `sm` | 13px | Captions, secondary text |
| `md` | 15px | Body text (default) |
| `lg` | 17px | Emphasized body |
| `xl` | 20px | Section headers |
| `2xl` | 24px | Page titles |
| `3xl` | 32px | Hero text |
| `4xl` | 40px | Display text |

#### Text Styles

Pre-configured combinations of size, weight, and line height:

**Display** - Heroes, splash screens
- `displayLarge` - 40px, bold, tight
- `displayMedium` - 32px, bold, tight

**Headlines** - Page titles, section headers
- `headlineLarge` - 24px, semibold, tight
- `headlineMedium` - 20px, semibold, tight
- `headlineSmall` - 17px, semibold, normal

**Body** - Main content
- `bodyLarge` - 17px, regular, normal
- `bodyMedium` - 15px, regular, normal
- `bodySmall` - 13px, regular, normal

**Labels** - Buttons, chips, badges
- `labelLarge` - 15px, medium, tight
- `labelMedium` - 13px, medium, tight
- `labelSmall` - 11px, medium, tight, wide spacing

**Caption** - Timestamps, metadata
- `caption` - 11px, regular, normal

**Font Families:** Platform-native by default (System/San Francisco on iOS, Roboto on Android).

### Elevation

Shadow system for depth hierarchy:

| Level | Usage | iOS Shadow | Android Elevation |
|-------|-------|------------|-------------------|
| `none` | Flat elements | 0 | 0 |
| `sm` | Cards at rest | 0 1px 2px rgba(0,0,0,0.05) | 1 |
| `md` | Interactive cards | 0 2px 4px rgba(0,0,0,0.1) | 3 |
| `lg` | Modals, dropdowns | 0 4px 8px rgba(0,0,0,0.15) | 6 |
| `xl` | FABs, toasts | 0 8px 16px rgba(0,0,0,0.2) | 12 |

**Guideline:** Use elevation sparingly. Too many levels create visual confusion.

### Motion

#### Duration
- `instant` (100ms) - Micro-interactions (button press)
- `fast` (150ms) - Quick feedback (toggle switch)
- `normal` (250ms) - Default transitions
- `slow` (350ms) - Emphasized animations
- `slower` (500ms) - Page transitions

#### Easing
- `default` - Standard cubic-bezier
- `enter` - Decelerate curve for entering elements
- `exit` - Accelerate curve for exiting elements
- `bounce` - Overshoot for emphasis
- `linear` - Progress indicators

#### Springs (React Native Reanimated)
- `snappy` - Quick spring for buttons
- `gentle` - Smooth spring for modals
- `bouncy` - Playful spring for fun interactions

**Accessibility:** Respect `prefers-reduced-motion` - disable animations when enabled.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | Sharp corners |
| `xs` | 2px | Subtle rounding |
| `sm` | 4px | Light rounding |
| `md` | 8px | Default (buttons, inputs) |
| `lg` | 12px | Cards |
| `xl` | 16px | Large cards |
| `2xl` | 24px | Hero elements |
| `full` | 9999px | Circles, pills |

## Component Guidelines

### Touch Targets

Minimum touch target size:
- **iOS:** 44x44pt
- **Android:** 48x48dp
- **Web:** 44x44px

Even if visual size is smaller, interactive area must meet minimums.

### States

All interactive components must have clear states:
- **Default** - Resting state
- **Hover** - Web/desktop pointer over (optional on mobile)
- **Pressed** - Active touch/click
- **Focused** - Keyboard focus (accessible)
- **Disabled** - Non-interactive (50% opacity)
- **Loading** - Pending action (spinner)

### Feedback

Provide immediate feedback:
- **Visual** - Color change, scale animation
- **Haptic** - Light impact on press (mobile)
- **Auditory** - Sound effects (optional, respect system settings)

### Accessibility

All components must:
- Have proper `accessibilityRole`
- Support `accessibilityLabel` and `accessibilityHint`
- Set `accessibilityState` (disabled, selected, checked)
- Support screen readers
- Meet WCAG 2.1 AA contrast ratios

## Design Decisions

### Why Plain Default Tokens?

The UI Foundation ships with neutral, professional defaults. This allows style guides to provide bold branding without fighting default opinions.

**Example:** A "Synthpunk" style guide overrides:
- Primary color → Cyan neon
- Typography → Orbitron font
- Radius → Sharp corners (0px)

But inherits:
- Spacing scale
- Elevation system
- Surface color structure

### Why Component-Level Theming?

Each component consumes tokens internally. This means:
1. **Consistency** - Spacing is always from the scale
2. **Maintainability** - Token changes cascade
3. **Predictability** - Components behave the same across apps

**Anti-pattern:** Inline styles with magic numbers
```typescript
// ❌ Bad
<View style={{ padding: 17, backgroundColor: '#e3e3e3' }} />

// ✅ Good
<View style={{
  padding: theme.spacing.lg,
  backgroundColor: theme.colors.background.secondary,
}} />
```

### Why Not CSS-in-JS on Native?

React Native uses StyleSheet.create() for performance. CSS-in-JS libraries add overhead and break platform optimizations.

**For web:** We provide CSS custom properties for integration with existing styles.

## Future Extensibility

### Planned Components
- Navigation (Header, TabBar, NavItem)
- Feedback (Toast, Alert, Modal, BottomSheet)
- Lists (ListItem, SwipeableRow, SectionList)
- Layout (Container, Card, Stack, SafeAreaView)

### Planned Features
- Figma token export/sync
- Accessibility audit tooling
- Performance monitoring
- Storybook component showcase

---

*Last updated: 2026-02-12*
