import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const links = [
  { href: '/progress', label: 'Progress' },
  { href: '/policies', label: 'Policy library' },
  { href: '/quiz', label: 'Safety quiz' },
  { href: '/assistant', label: 'AI assistant' },
  { href: '/settings', label: 'Settings' },
] as const;

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      {links.map((link) => (
        <Link key={link.href} href={link.href} asChild>
          <Pressable style={styles.row}>
            <Text style={styles.rowText}>{link.label}</Text>
          </Pressable>
        </Link>
      ))}
      <Text style={styles.note}>
        Native interruption modules are stubbed in modules/nativeIntegrations.ts and are not active.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FC' },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#111827' },
  row: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rowText: { fontWeight: '600', color: '#111827' },
  note: { marginTop: 16, color: '#6B7280', fontSize: 12, lineHeight: 18 },
});
