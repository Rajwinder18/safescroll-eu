import { api } from '@safescroll/api-client';
import type { Challenge } from '@safescroll/shared-types';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ChallengesScreen() {
  const [items, setItems] = useState<Challenge[]>([]);

  useEffect(() => {
    api.challenges.listChallenges().then((r) => setItems(r.data || []));
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: '#F8F9FC' }}
      contentContainerStyle={{ padding: 16 }}
      data={items}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<Text style={styles.title}>Daily challenges</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.body}>{item.description}</Text>
          <Pressable
            style={styles.button}
            onPress={() => api.challenges.increment(item.id)}
          >
            <Text style={styles.buttonText}>Log progress</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#111827' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: { fontWeight: '700', fontSize: 16, color: '#111827' },
  body: { marginTop: 6, color: '#6B7280', lineHeight: 20 },
  button: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#6366F1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
