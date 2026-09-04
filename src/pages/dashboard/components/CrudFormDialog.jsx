import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField
} from '@mui/material';
import { buildDraft, draftToValues, findMissingRequired } from './formUtils.js';
import ImageField from './ImageField.jsx';
import { sanitizeError } from '../../../lib/errorSanitizer.js';

export default function CrudFormDialog({
  open,
  title,
  fields,
  initialValues,
  onClose,
  onSubmit,
  submitting = false,
  serverError = null
}) {
  const [draft, setDraft] = useState(() => buildDraft(fields, initialValues));
  const [validationError, setValidationError] = useState(null);

  const handleChange = (name, value) => {
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const missing = findMissingRequired(fields, draft);
    if (missing) {
      setValidationError(`"${missing.label}" is required.`);
      return;
    }
    setValidationError(null);
    await onSubmit(draftToValues(fields, draft));
  };

  const rawError = validationError || serverError;
  const error = rawError ? sanitizeError(rawError) : null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {fields.map((field) => {
              if (field.type === 'switch') {
                return (
                  <FormControlLabel
                    key={field.name}
                    control={
                      <Switch
                        checked={Boolean(draft[field.name])}
                        onChange={(e) => handleChange(field.name, e.target.checked)}
                      />
                    }
                    label={field.label}
                  />
                );
              }
              if (field.type === 'image') {
                return (
                  <ImageField
                    key={field.name}
                    label={field.label}
                    value={draft[field.name] ?? ''}
                    onChange={(v) => handleChange(field.name, v)}
                    folder={field.folder || 'misc'}
                    accept={field.accept || 'image/*'}
                  />
                );
              }
              return (
                <TextField
                  key={field.name}
                  label={field.label}
                  value={draft[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  type={field.inputType || 'text'}
                  required={field.required}
                  multiline={field.type === 'textarea' || field.type === 'list'}
                  minRows={field.rows || (field.type === 'list' ? 4 : field.type === 'textarea' ? 3 : undefined)}
                  helperText={field.helper}
                  size="small"
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit" disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting} startIcon={submitting ? <CircularProgress size={16} /> : null}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
