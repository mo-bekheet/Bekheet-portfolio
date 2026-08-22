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
  const counts = await Promise.all([
    ...tables.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      return error ? null : count ?? 0;
    }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).then(
      ({ count, error }) => (error ? null : count ?? 0),
      () => null
    ),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('read', false).then(
      ({ count, error }) => (error ? null : count ?? 0),
      () => null
    )
  ]);
  return Object.fromEntries([...tables.map((table, i) => [table, counts[i]]), ['messages', counts[5]], ['messagesUnread', counts[6]]]);
}

export const messagesApi = {
  async list() {
    if (!isSupabaseConfigured) return rejectNotConfigured();
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  async markRead(id, read = true) {
    if (!isSupabaseConfigured) return rejectNotConfigured();
    const { data, error } = await supabase
      .from('messages')
      .update({ read })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    if (!isSupabaseConfigured) return rejectNotConfigured();
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) throw error;
  },
  async create(values) {
    if (!isSupabaseConfigured) return rejectNotConfigured();
    const { data, error } = await supabase.from('messages').insert(values).select().single();
    if (error) throw error;
    return data;
  }
};

function detectDevice() {
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'mobile';
  return 'desktop';
}

function getSessionId() {
  try {
    let sid = sessionStorage.getItem('bk_session_id');
    if (!sid) {
      sid =
        window.crypto?.randomUUID?.() ||
        `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem('bk_session_id', sid);
    }
    return sid;
  } catch {
    return 'anonymous';
  }
}

export function trackPageView(path) {
  if (!isSupabaseConfigured || navigator.webdriver) return;
  let referrer = null;
  try {
    if (document.referrer && new URL(document.referrer).host !== window.location.host) {
      referrer = document.referrer;
    }
  } catch {
    referrer = null;
  }
  supabase
    .from('page_views')
    .insert({ path, referrer, device: detectDevice(), session_id: getSessionId() })
    .then(
      () => {},
      () => {}
    );
}

export function trackLinkClick(url, pagePath) {
  if (!isSupabaseConfigured || navigator.webdriver) return;
  supabase
    .from('link_clicks')
    .insert({ url, page_path: pagePath })
    .then(
      () => {},
      () => {}
    );
}

const daysAgoIso = (days) => new Date(Date.now() - days * 86400000).toISOString();

function groupCount(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (key === null || key === undefined || key === '') continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function buildDailySeries(views, days) {
  const buckets = new Map();
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(Date.now() - i * 86400000);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const view of views) {
    const day = view.created_at.slice(0, 10);
    if (buckets.has(day)) buckets.set(day, buckets.get(day) + 1);
  }
  return [...buckets.entries()].map(([date, views]) => ({
    date: date.slice(5),
    views
  }));
}

export async function fetchAnalytics(days = 30) {
  if (!isSupabaseConfigured) return null;
  const since = daysAgoIso(days);

  const [viewsRes, clicksRes, messagesTotal, messagesUnread] = await Promise.all([
    supabase
      .from('page_views')
      .select('path, referrer, device, session_id, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(10000),
    supabase
      .from('link_clicks')
      .select('url, page_path, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(10000),
    supabase.from('messages').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('read', false)
  ]);

  if (viewsRes.error) throw viewsRes.error;
  if (clicksRes.error) throw clicksRes.error;

  const views = viewsRes.data ?? [];
  const clicks = clicksRes.data ?? [];

  const topPages = groupCount(views, (v) => v.path).slice(0, 8)
    .map(([path, count]) => ({ label: path, count }));
  const topLinks = groupCount(clicks, (c) => c.url).slice(0, 8)
    .map(([url, count]) => ({ label: url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 48), url, count }));
  const devices = groupCount(views, (v) => v.device)
    .map(([label, count]) => ({ label: label || 'unknown', value: count }));
  const referrers = groupCount(views, (v) => {
    try {
      return v.referrer ? new URL(v.referrer).host : null;
    } catch {
      return null;
    }
  })
    .slice(0, 8)
    .map(([host, count]) => ({ host, count }));

  return {
    rangeDays: days,
    totals: {
      views: views.length,
      uniqueVisitors: new Set(views.map((v) => v.session_id)).size,
      linkClicks: clicks.length,
      messages: messagesTotal.count ?? 0,
      unreadMessages: messagesUnread.count ?? 0
    },
    dailySeries: buildDailySeries(views, days),
    topPages,
    topLinks,
    devices,
    referrers
  };
}
