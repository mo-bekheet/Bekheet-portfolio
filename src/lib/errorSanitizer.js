export function sanitizeError(error) {
  if (!error) return 'An unexpected error occurred';

  const message = String(error.message || error);

  const friendlyMessages = [
    { pattern: /duplicate key value violates unique constraint/i, message: 'A record with this value already exists' },
    { pattern: /violates not-null constraint/i, message: 'A required field is missing' },
    { pattern: /violates foreign key constraint/i, message: 'Referenced record does not exist' },
    { pattern: /violates check constraint/i, message: 'Invalid value provided' },
    { pattern: /permission denied/i, message: 'You do not have permission to perform this action' },
    { pattern: /row-level security/i, message: 'Access denied' },
    { pattern: /JWT expired|token expired/i, message: 'Your session has expired. Please sign in again' },
    { pattern: /invalid login credentials/i, message: 'Invalid email or password' },
    { pattern: /email not confirmed/i, message: 'Email not confirmed. Check your inbox for confirmation link' },
    { pattern: /user not found/i, message: 'Account not found' },
    { pattern: /storage.*not found|bucket.*not found/i, message: 'Storage not configured. Contact administrator' },
    { pattern: /file too large/i, message: 'File exceeds maximum allowed size' },
    { pattern: /invalid file type|file type not allowed/i, message: 'File type not supported' },
    { pattern: /rate limit|too many requests/i, message: 'Too many requests. Please wait and try again' },
    { pattern: /network|fetch failed|ECONNREFUSED/i, message: 'Network error. Check your connection' },
    { pattern: /timeout/i, message: 'Request timed out. Please try again' },
    { pattern: /supabase.*not configured/i, message: 'Service not configured. Contact administrator' },
  ];

  for (const { pattern, message: friendly } of friendlyMessages) {
    if (pattern.test(message)) return friendly;
  }

  if (message.length > 200) {
    return 'An error occurred. Please try again or contact support';
  }

  return message;
}

export function sanitizeErrorForLogging(error) {
  return String(error?.message || error || 'Unknown error');
}