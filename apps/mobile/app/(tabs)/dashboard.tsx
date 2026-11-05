import { api } from '@safescroll/api-client';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    api.analytics.getScreenTimeSeries(7).then((r) => {
      const series = r.data || [];
      const latest = series[series.length - 1];
      setScore(latest?.wellbeingScore ?? null);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>Overview</Text>
      <Text style={styles.title}>Your digital wellbeing</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Demo wellbeing index</Text>
        <Text style={styles.score}>{score ?? '—'}</Text>
        <Text style={styles.note}>Demonstration data — not measured device usage.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F8F9FC' },
  kicker: { color: '#6366F1', fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', fontSize: 11 },
  title: { marginTop: 6, fontSize: 28, fontWeight: '800', color: '#111827' },
  card: {
    marginTop: 18,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  label: { color: '#6B7280', fontSize: 13 },
  score: { marginTop: 8, fontSize: 42, fontWeight: '800', color: '#6366F1' },
  note: { marginTop: 10, color: '#92400E', fontSize: 12 },
});
