import { Text, View, StyleSheet } from 'react-native';

export default function ScreenTimeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen time</Text>
      <Text style={styles.body}>
        Native UsageStatsManager / iOS Screen Time integrations are prepared but not active.
        Demo charts live in the web app and will share the same wellbeing-engine packages.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FC' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827' },
  body: { marginTop: 12, color: '#4B5563', lineHeight: 22 },
});
