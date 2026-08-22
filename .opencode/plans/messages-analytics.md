# Plan: Visitor Messages Inbox + Analytics Dashboard

Status: approved by user (contact form = save to DB + email; analytics = custom Supabase tracking, on-navigation freshness not applicable here — tracking is fire-and-forget inserts).

## Phase 1 — Migration v3 (`supabase/migration-3-analytics.sql`) — user runs in SQL Editor
Idempotent, mirrors migration-2 style. Three tables, all with RLS enabled:

1. **messages** — contact form submissions
   - `id uuid pk default gen_random_uuid()`, `name text`, `email text not null`, `message text not null`, `read boolean default false`, `created_at timestamptz default now()`
   - Policies: anon INSERT only; authenticated SELECT/UPDATE/DELETE
   - Indexes: created_at desc, read
2. **page_views**
   - `id bigint identity pk`, `path text not null`, `referrer text`, `device text` (mobile/tablet/desktop), `session_id text not null`, `created_at`
   - Policies: anon INSERT only; authenticated SELECT
   - Indexes: created_at desc, path, session_id
3. **link_clicks**
   - `id bigint identity pk`, `url text not null`, `page_path text`, `created_at`
   - Policies: anon INSERT only; authenticated SELECT
   - Indexes: created_at desc, url

## Phase 2 — Dependency
`npm install @mui/x-charts` (compatible with @mui/material v6.4). Charts match admin dark theme.

## Phase 3 — API layer (`src/lib/api.js`)
- `messagesApi`: `list()` (order created_at desc), `markRead(id, read)`, `remove(id)`, `create({name,email,message})` — create runs under anon key, allowed by RLS insert policy
- `trackPageView(path)` / `trackLinkClick(url, pagePath)`: silent `.catch(()=>{})` inserts; never throw, never block UI/navigation
- `fetchAnalytics(days=30)`: parallel queries via existing supabase client:
  - totals: head-count on messages/page_views/link_clicks (+unread messages count)
  - rows since cutoff for grouping in JS (portfolio-scale data is small):
    - views per day (LineChart)
    - top pages (BarChart)
    - top clicked links (BarChart/list, shortened URLs)
    - device breakdown (PieChart donut)
    - referrers table (external-host referrer only)
    - unique visitors = distinct session_id count
  - returns `{ totals, dailySeries, topPages, topLinks, devices, referrers }`

## Phase 4 — Tracking hooks (`src/hooks/useTracking.js`), mounted once in `PublicArea` (`src/App.jsx`)
- `usePageViewTracker()`: `useLocation()` → effect on pathname; skips `/admin*`; session id = `crypto.randomUUID()` cached in `sessionStorage`; device from coarse UA regex; referrer recorded only when `document.referrer` host differs from site host; skip when `navigator.webdriver` (bots)
- `useOutboundClickTracker()`: mount-once document capture-phase click listener → closest('a[href]'); logs http(s)/mailto/tel/.pdf hrefs that are external or non-page; records current path as page_path; never preventDefault
- Both no-ops if Supabase unconfigured

## Phase 5 — Contact form dual-write (`src/components/Home/Contact.jsx`)
- Keep EmailJS send exactly as-is
- Add parallel `messagesApi.create(...)` via `Promise.allSettled`
- Success alert if either channel succeeded; console.warn the other's failure; loading state covers both

## Phase 6 — Inbox page `/admin/inbox` (`src/pages/dashboard/ManageMessages.jsx`)
Custom page (not CrudSection — needs mark-read semantics):
- MUI List/Table: unread bold + dot badge, name/email/relative date, message body expandable (Collapse)
- Actions: open→marks read, toggle unread, delete (confirm dialog), Reply→`mailto:` button
- Unread count surfaced app-wide: extend `fetchCounts()` to include `messages` total + `messagesUnread`

## Phase 7 — Analytics page `/admin/analytics` (`src/pages/dashboard/DashboardAnalytics.jsx`)
- Range toggle: 7 / 30 days (ToggleButtonGroup, default 30)
- Stat cards row: Total views · Unique visitors · Link clicks · Unread messages
- LineChart: views/day over range
- BarChart: top pages; BarChart: top clicked links
- PieChart donut: devices; Table: top referrers
- Empty-state note when tables have no data yet

## Phase 8 — Wiring
- `src/App.jsx`: lazy imports ManageMessages + DashboardAnalytics; routes `inbox`, `analytics` inside admin layout
- `DashboardLayout.jsx` NAV_ITEMS: add `{ to: '/admin/inbox', label: 'Inbox', icon: <MailIcon /> }` and `{ to: '/admin/analytics', label: 'Analytics', icon: <InsightsIcon /> }` after Overview; optional Badge chip with unread count (layout fetches counts once)

## Phase 9 — Verify + commit per phase
- `npm run build`, `npm test`, lint delta check (baseline 182 problems, prop-types category expected on new components)
- Commits:
  1. `chore: analytics and messages schema migration sql`
  2. `feat: visitor tracking hooks and analytics api`
  3. `feat: contact form saves submissions to supabase alongside emailjs`
  4. `feat: admin inbox for contact messages`
  5. `feat: admin analytics dashboard with charts`

## User actions after implementation
1. Run `supabase/migration-3-analytics.sql` in Supabase SQL Editor (required before anything works)
2. Test: submit contact form → check /admin/inbox; browse site → /admin/analytics shows visits/clicks
