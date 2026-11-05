import { api } from '@safescroll/api-client';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function MindfulScreen() {
  const [status, setStatus] = useState('Ready for a calm pause');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mindful break</Text>
      <View style={styles.circle}>
        <Text style={styles.circleText}>Breathe</Text>
      </View>
      <Text style={styles.status}>{status}</Text>
      <Pressable
        style={styles.primary}
        onPress={async () => {
          await api.mindful.record({
            type: 'breathing',
            durationSeconds: 60,
            action: 'breathe',
          });
          setStatus('Demo breathing session recorded locally');
        }}
      >
        <Text style={styles.primaryText}>Log 60s breathing (demo)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 24 },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: { color: '#fff', fontWeight: '700', fontSize: 20 },
  status: { marginTop: 20, color: '#4B5563' },
  primary: {
    marginTop: 24,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  primaryText: { color: '#fff', fontWeight: '700' },
});
