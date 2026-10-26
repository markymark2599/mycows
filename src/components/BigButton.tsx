import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  onPress?: () => void;
  background: string;
  color: string;
  border: string;
  size?: 'large' | 'medium';
};

// Large, high-contrast buttons: the scorekeeper is in a moving car.
export function BigButton({ label, onPress, background, color, border, size = 'medium' }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        size === 'large' && styles.large,
        { backgroundColor: background, borderColor: border },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, size === 'large' && styles.largeLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 60,
    paddingHorizontal: 24,
    borderRadius: 18,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  large: {
    minHeight: 84,
    borderRadius: 24,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
  },
  largeLabel: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
