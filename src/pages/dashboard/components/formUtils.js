export const toInputValue = (field, value) => {
  switch (field.type) {
    case 'list':
      return Array.isArray(value) ? value.join('\n') : (value ?? '');
    case 'switch':
      return Boolean(value);
    case 'number':
      return value ?? 0;
    default:
      if (value === null || value === undefined) return '';
      return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
  }
};

export const fromInputValue = (field, raw) => {
  const value = typeof raw === 'string' ? raw : raw ?? '';
  switch (field.type) {
    case 'list':
      return String(value)
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    case 'switch':
      return Boolean(value);
    case 'number': {
      const num = Number(value);
      return Number.isFinite(num) ? num : 0;
    }
    case 'json': {
      const text = String(value).trim();
      if (!text) return null;
      try {
        return JSON.parse(text);
      } catch {
        return { __invalid: text };
      }
    }
    default:
      return String(value).trim() || null;
  }
};

export const buildDraft = (fields, values = {}) =>
  Object.fromEntries(fields.map((field) => [field.name, toInputValue(field, values[field.name])]));

export const draftToValues = (fields, draft) => {
  const output = {};
  for (const field of fields) {
    output[field.name] = fromInputValue(field, draft[field.name]);
  }
  return output;
};

export const findMissingRequired = (fields, draft) =>
  fields.find((field) => {
    if (!field.required) return false;
    const value = fromInputValue(field, draft[field.name]);
    if (field.type === 'list') return !value.length;
    if (field.type === 'switch') return false;
    return value === null || value === undefined || value === '' ||
      (typeof value === 'object' && Object.keys(value).length === 0);
  });
