// Mock implementation of expo-haptics for Storybook
export const ImpactFeedbackStyle = {
  Light: 'light',
  Medium: 'medium',
  Heavy: 'heavy',
};

export const NotificationFeedbackType = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};

export function impactAsync(style) {
  // No-op for web
  return Promise.resolve();
}

export function notificationAsync(type) {
  // No-op for web
  return Promise.resolve();
}

export function selectionAsync() {
  // No-op for web
  return Promise.resolve();
}
