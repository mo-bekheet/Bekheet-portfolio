exports.handler = async function (event) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://bekheet.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const report = JSON.parse(event.body);
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
  } catch (e) {
    console.error('Failed to parse CSP report:', e.message);
  }

  return {
    statusCode: 204,
    headers: corsHeaders,
  };
};