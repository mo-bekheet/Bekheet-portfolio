import { useRef, useState } from 'react';
import { Box, Button, CircularProgress, InputAdornment, Stack, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

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

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('File type not allowed. Use JPEG, PNG, WebP, or PDF.');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch('/.netlify/functions/upload-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBase64: base64, filename: file.name, folder }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
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
