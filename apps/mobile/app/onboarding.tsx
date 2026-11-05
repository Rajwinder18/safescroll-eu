import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const steps = [
  'Measure habits with transparent scores (demo data on web/mobile until native permissions).',
  'Practice mindful pauses before you scroll.',
  'Learn EU digital safety and age-protection context.',
];

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Safe Scroll</Text>
      {steps.map((step) => (
        <Text key={step} style={styles.step}>
          • {step}
        </Text>
      ))}
      <Link href="/(auth)/sign-in" asChild>
        <Pressable style={styles.primary}>
          <Text style={styles.primaryText}>Get started</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FC', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 18 },
  step: { color: '#4B5563', fontSize: 15, lineHeight: 22, marginBottom: 10 },
  primary: {
    marginTop: 24,
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
});
