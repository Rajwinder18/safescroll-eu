import { policyTimeline } from '@safescroll/policy-content';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function PoliciesScreen() {
  return (
    <FlatList
      style={{ backgroundColor: '#F8F9FC' }}
      contentContainerStyle={{ padding: 16 }}
      data={policyTimeline}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<Text style={styles.title}>Policy library</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.meta}>
            {item.month} {item.year} · {item.badge}
          </Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.body}>{item.description}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  meta: { color: '#6366F1', fontSize: 12, fontWeight: '700' },
  cardTitle: { marginTop: 6, fontWeight: '700', fontSize: 16 },
  body: { marginTop: 6, color: '#6B7280', lineHeight: 20 },
});
