import { useRef, useState } from 'react';
import { Box, Button, CircularProgress, InputAdornment, Stack, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase.js';

export default function ImageField({ label, value, onChange, folder = 'misc', accept = 'image/*' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const isPdf = value && value.toLowerCase().endsWith('.pdf');
  const previewUrl = isPdf ? null : value;

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured.');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${folder}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('media').getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={1}>
      <TextField
        label={label}
        size="small"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        error={Boolean(error)}
        helperText={error}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                onChange={handleUpload}
              />
              <Button
                size="small"
                startIcon={uploading ? <CircularProgress size={14} /> : <UploadIcon />}
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? 'Uploading…' : 'Upload'}
              </Button>
            </InputAdornment>
          )
        }}
      />
      {previewUrl && (
        <Box
          component="img"
          src={previewUrl}
          alt={`${label} preview`}
          sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
        />
      )}
      {isPdf && <Box fontSize="small" color="text.secondary">PDF uploaded ✓</Box>}
    </Stack>
  );
}
