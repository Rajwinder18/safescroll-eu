import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Safe Scroll</Text>
      <Text style={styles.tagline}>Understand Your Digital Habits. Take Control of Your Digital Life.</Text>
      <Text style={styles.demo}>Demo mode — mock services active until Supabase credentials are added.</Text>
      <Link href="/onboarding" asChild>
        <Pressable style={styles.primary}>
          <Text style={styles.primaryText}>Continue</Text>
        </Pressable>
      </Link>
      <Link href="/(auth)/sign-in" asChild>
        <Pressable style={styles.secondary}>
          <Text style={styles.secondaryText}>Sign in</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    padding: 28,
  },
  brand: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
  },
  tagline: {
    marginTop: 12,
    color: '#C7D2FE',
    fontSize: 16,
    lineHeight: 24,
  },
  demo: {
    marginTop: 24,
    color: '#FCD34D',
    fontSize: 12,
  },
  primary: {
    marginTop: 32,
    backgroundColor: '#6366F1',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondary: {
    marginTop: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryText: { color: '#E5E7EB', fontWeight: '600' },
});
