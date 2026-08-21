import { supabase, isSupabaseConfigured } from './supabase';

export const notConfiguredError = new Error(
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
);

export async function signIn({ email, password }) {
  if (!isSupabaseConfigured) return { data: { user: null }, error: notConfiguredError };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  if (!isSupabaseConfigured) return;
  await supabase.auth.signOut();
}

export function onAuthChange(callback) {
  if (!isSupabaseConfigured) {
    callback(null);
    return () => {};
  }
  supabase.auth.getSession().then(({ data }) => callback(data.session?.user ?? null));
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
  return () => data.subscription.unsubscribe();
}
