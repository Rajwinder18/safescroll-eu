import { Text, View, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.c}>
      <Text style={styles.t}>Settings</Text>
      <Text style={styles.b}>
        Theme, notifications, and privacy preferences share the same api-client storage keys as web
        when running on a device with local persistence.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, padding: 20, backgroundColor: '#F8F9FC' },
  t: { fontSize: 24, fontWeight: '800' },
  b: { marginTop: 10, color: '#4B5563', lineHeight: 22 },
});
