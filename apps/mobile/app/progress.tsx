import { Text, View, StyleSheet } from 'react-native';
export default function ProgressScreen() {
  return (
    <View style={styles.c}>
      <Text style={styles.t}>Progress</Text>
      <Text style={styles.b}>Achievements sync from shared challenge/mindful services (local demo).</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: 20, backgroundColor: '#F8F9FC' },
  t: { fontSize: 24, fontWeight: '800' },
  b: { marginTop: 10, color: '#4B5563', lineHeight: 22 },
});
