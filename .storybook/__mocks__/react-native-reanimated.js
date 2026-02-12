// Mock implementation of react-native-reanimated for Storybook
import { Animated } from 'react-native-web';

// Export basic hooks as no-ops or simple implementations
export function useSharedValue(initialValue) {
  return { value: initialValue };
}

export function useAnimatedStyle(styleFactory) {
  return styleFactory();
}

export function withSpring(value, config) {
  return value;
}

export function withTiming(value, config) {
  return value;
}

export function withDelay(delay, animation) {
  return animation;
}

export function withSequence(...animations) {
  return animations[animations.length - 1];
}

export function withRepeat(animation, numberOfReps, reverse) {
  return animation;
}

export function cancelAnimation(animatedValue) {
  // No-op
}

export function runOnJS(fn) {
  return fn;
}

export function runOnUI(fn) {
  return fn;
}

export function useAnimatedReaction(prepare, react, dependencies) {
  // No-op
}

export function useAnimatedRef() {
  return { current: null };
}

export function useDerivedValue(processor, dependencies) {
  return processor();
}

export function useAnimatedScrollHandler(handlers) {
  return () => {};
}

export function useAnimatedGestureHandler(handlers) {
  return () => {};
}

export function useWorkletCallback(callback, dependencies) {
  return callback;
}

export function useAnimatedProps(props) {
  return props();
}

export function createAnimatedComponent(Component) {
  return Component;
}

export function interpolate(value, inputRange, outputRange, options) {
  // Simple linear interpolation
  return value;
}

export function Extrapolate() {}
Extrapolate.CLAMP = 'clamp';
Extrapolate.EXTEND = 'extend';
Extrapolate.IDENTITY = 'identity';

// Re-export Animated from react-native-web as default
const Reanimated = {
  ...Animated,
  createAnimatedComponent,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  withRepeat,
  cancelAnimation,
  runOnJS,
  runOnUI,
  useAnimatedReaction,
  useAnimatedRef,
  useDerivedValue,
  useAnimatedScrollHandler,
  useAnimatedGestureHandler,
  useWorkletCallback,
  useAnimatedProps,
  interpolate,
  Extrapolate,
};

export default Reanimated;
