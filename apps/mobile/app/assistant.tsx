import { api } from '@safescroll/api-client';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AssistantScreen() {
  const [input, setInput] = useState('Explain GDPR Article 8');
  const [reply, setReply] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI assistant</Text>
      <Text style={styles.note}>Mock adapter — no medical diagnoses. Keys stay off-device.</Text>
      <TextInput style={styles.input} value={input} onChangeText={setInput} multiline />
      <Pressable
        style={styles.primary}
        onPress={async () => {
          const res = await api.ai.send(input);
          const msgs = res.data || [];
          setReply(msgs[msgs.length - 1]?.content || '');
        }}
      >
        <Text style={styles.primaryText}>Ask</Text>
      </Pressable>
      {reply ? <Text style={styles.reply}>{reply}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FC' },
  title: { fontSize: 24, fontWeight: '800' },
  note: { marginTop: 8, color: '#92400E', fontSize: 12 },
  input: {
    marginTop: 16,
    minHeight: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
  },
  primary: {
    marginTop: 12,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  reply: { marginTop: 16, color: '#374151', lineHeight: 22 },
});
