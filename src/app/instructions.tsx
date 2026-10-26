import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

// Keep in sync with "The game" section of CLAUDE.md.
const calls = [
  { icon: '🐄', sighting: 'Cows', call: '"My cows!"', effect: 'Add the cows you see to your cows.' },
  { icon: '⛪', sighting: 'Church', call: '"Marry my cows!"', effect: 'Double your cows.' },
  { icon: '🪦', sighting: 'Cemetery', call: '"Kill ___\'s cows!"', effect: "Wipe out another player's cows." },
  { icon: '🍔', sighting: "McDonald's", call: '"Cash in my cows!"', effect: 'Bank your cows. Banked cows are safe forever.' },
];

export default function Instructions() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.intro, { color: colors.text }]}>
        Watch the road. The first person to shout the call gets it.
      </Text>

      {calls.map((c) => (
        <View key={c.sighting} style={[styles.row, { borderColor: colors.accent }]}>
          <Text style={styles.icon}>{c.icon}</Text>
          <View style={styles.rowText}>
            <Text style={[styles.sighting, { color: colors.mutedText }]}>{c.sighting}</Text>
            <Text style={[styles.call, { color: colors.text }]}>{c.call}</Text>
            <Text style={[styles.effect, { color: colors.text }]}>{c.effect}</Text>
          </View>
        </View>
      ))}

      <Text style={[styles.footer, { color: colors.text }]}>
        When you arrive, only banked cows count. Cash in before it's too late!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  intro: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  icon: {
    fontSize: 40,
  },
  rowText: {
    flex: 1,
  },
  sighting: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  call: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  effect: {
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
  },
  footer: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 8,
  },
});
