import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Env = {
  CSP_REPORTS: KVNamespace;
};

const ALLOWED_ORIGINS = ['https://bekheet.com', 'https://www.bekheet.com'];

const app = new Hono<{ Bindings: Env }>();

app.use('/csp-report*', cors({
  origin: ALLOWED_ORIGINS,
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  maxAge: 86400,
}));

app.post('/csp-report', async (c) => {
  const origin = c.req.header('origin') || '';
  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };

  try {
    const report = await c.req.json();
    const cspReport = report['csp-report'] || report;

    console.warn('CSP Violation:', {
      'document-uri': cspReport['document-uri'],
      'referrer': cspReport['referrer'],
      'violated-directive': cspReport['violated-directive'],
      'effective-directive': cspReport['effective-directive'],
      'original-policy': cspReport['original-policy'],
      'blocked-uri': cspReport['blocked-uri'],
      'line-number': cspReport['line-number'],
      'column-number': cspReport['column-number'],
      'source-file': cspReport['source-file'],
      'script-sample': cspReport['script-sample'],
      'disposition': cspReport['disposition'],
    });

    if (c.env.CSP_REPORTS) {
      const key = `csp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await c.env.CSP_REPORTS.put(key, JSON.stringify(cspReport), { expirationTtl: 86400 * 30 });
    }
  } catch (e) {
    console.error('Failed to parse CSP report:', e);
  }

  return c.newResponse(null, 204, corsHeaders);
});

export default app;