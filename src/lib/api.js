import { supabase, isSupabaseConfigured } from './supabase';

const rejectNotConfigured = () => Promise.reject(new Error('Supabase is not configured'));

function crud(table, { order = 'sort_order', ascending = true } = {}) {
  return {
    async list() {
      if (!isSupabaseConfigured) return rejectNotConfigured();
      const { data, error } = await supabase.from(table).select('*').order(order, { ascending });
      if (error) throw error;
      return data ?? [];
    },
    async listPublished() {
      if (!isSupabaseConfigured) return rejectNotConfigured();
      const query = supabase
        .from(table)
        .select('*')
        .eq('published', true)
        .order(order, { ascending });
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    async create(values) {
      if (!isSupabaseConfigured) return rejectNotConfigured();
      const { data, error } = await supabase.from(table).insert(values).select().single();
      if (error) throw error;
      return data;
    },
    async update(id, values) {
      if (!isSupabaseConfigured) return rejectNotConfigured();
      const { data, error } = await supabase
        .from(table)
        .update(values)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async remove(id) {
      if (!isSupabaseConfigured) return rejectNotConfigured();
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    }
  };
}

export const projectsApi = crud('projects');
export const postsApi = crud('posts', { order: 'created_at', ascending: false });
export const experienceApi = crud('experience');
export const certificationsApi = crud('certifications');
export const testimonialsApi = crud('testimonials');

export const sectionApis = {
  projects: projectsApi,
  posts: postsApi,
  experience: experienceApi,
  certifications: certificationsApi,
  testimonials: testimonialsApi
};

export const profileApi = {
  async get() {
    if (!isSupabaseConfigured) return rejectNotConfigured();
    const { data, error } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle();
    if (error) throw error;
    return data;
  },
  async save(values) {
    if (!isSupabaseConfigured) return rejectNotConfigured();
    const { data, error } = await supabase
      .from('profile')
      .upsert({ id: 1, ...values, updated_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

export async function fetchCounts() {
  if (!isSupabaseConfigured) return null;
  const tables = ['projects', 'posts', 'experience', 'certifications', 'testimonials'];
  const counts = await Promise.all(
    tables.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      return error ? null : count ?? 0;
    })
  );
  return Object.fromEntries(tables.map((table, i) => [table, counts[i]]));
}
