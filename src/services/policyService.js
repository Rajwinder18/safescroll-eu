import { isSupabaseConfigured, requireSupabase } from '../lib/supabase';

export async function listPolicies() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('policies')
    .select('id, country_code, title, status, summary, source_url, updated_at')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function savePolicy(policy) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('policies')
    .upsert(policy, { onConflict: 'id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function subscribeToPolicyChanges(onChange) {
  if (!isSupabaseConfigured) return () => {};

  const client = requireSupabase();
  const channel = client
    .channel('safescroll-policies')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'policies' }, onChange)
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}

export function subscribeToProgressChanges(onChange) {
  if (!isSupabaseConfigured) return () => {};

  const client = requireSupabase();
  const channel = client
    .channel('safescroll-progress')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'user_progress' }, onChange)
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}
