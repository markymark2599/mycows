import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BigButton } from '@/components/BigButton';
import { CowPrint } from '@/components/CowPrint';
import { colors } from '@/theme/colors';

export default function Landing() {
  return (
    <View style={styles.root}>
      <CowPrint hide={colors.hide} spots={colors.spots} />
      <SafeAreaView style={styles.content}>
        <View style={[styles.titleCard, { backgroundColor: colors.surface, borderColor: colors.spots }]}>
          <Text style={[styles.title, { color: colors.text }]}>My Cows!</Text>
          <Text style={[styles.subtitle, { color: colors.mutedText }]}>The road trip cow game</Text>
        </View>

        <View style={styles.buttons}>
          {/* No game screen yet: the team is deciding what it looks like. */}
          <BigButton
            label="Start Game"
            size="large"
            background={colors.primary}
            color={colors.onPrimary}
            border={colors.spots}
          />
          <BigButton
            label="How to Play"
            onPress={() => router.push('/instructions')}
            background={colors.secondary}
            color={colors.onSecondary}
            border={colors.spots}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  titleCard: {
    marginTop: 40,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 28,
    borderWidth: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  buttons: {
    gap: 16,
    marginBottom: 40,
  },
});
