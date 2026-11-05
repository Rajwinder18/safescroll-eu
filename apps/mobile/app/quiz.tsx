import { quizQuestions } from '@safescroll/policy-content';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const q = quizQuestions[index];

  return (
    <View style={styles.container}>
      <Text style={styles.meta}>
        Question {index + 1}/{quizQuestions.length}
      </Text>
      <Text style={styles.title}>{q.question}</Text>
      {q.options.map((opt) => (
        <Pressable
          key={opt}
          style={styles.option}
          onPress={() => setIndex((i) => Math.min(quizQuestions.length - 1, i + 1))}
        >
          <Text>{opt}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FC' },
  meta: { color: '#6366F1', fontWeight: '700' },
  title: { marginTop: 8, fontSize: 20, fontWeight: '800', marginBottom: 16 },
  option: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
