import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { profileApi } from '../../lib/api.js';
import useAppStore from '../../store/useAppStore.js';
import ImageField from './components/ImageField.jsx';

const EMPTY = {
  full_name: '',
  tagline: '',
  roles: [],
  bio: '',
  location: '',
  email: '',
  phone: '',
  resume_url: '',
  resume_preview_url: '',
  hero_image_url: '',
  avatar_url: '',
  github_url: '',
  linkedin_url: '',
  kaggle_url: '',
  dev_url: '',
  whatsapp_url: ''
};

const BASICS = [
  { name: 'full_name', label: 'Full name' },
  { name: 'tagline', label: 'Tagline', helper: 'Short headline shown near your name' },
  { name: 'location', label: 'Location' }
];

const CONTACT = [
  { name: 'email', label: 'Email', inputType: 'email' },
  { name: 'phone', label: 'Phone' }
];

const LINKS = [
  { name: 'github_url', label: 'GitHub URL' },
  { name: 'linkedin_url', label: 'LinkedIn URL' },
  { name: 'kaggle_url', label: 'Kaggle URL' },
  { name: 'dev_url', label: 'Dev.to URL' },
  { name: 'whatsapp_url', label: 'WhatsApp URL' }
];

const MEDIA = [
  { name: 'resume_url', label: 'Resume PDF', accept: 'application/pdf', folder: 'resume' },
  { name: 'resume_preview_url', label: 'Resume preview image', folder: 'resume' },
  { name: 'hero_image_url', label: 'Home hero image', folder: 'profile' },
  { name: 'avatar_url', label: 'Avatar image', folder: 'profile' }
];

export default function ManageProfile() {
  const setUserProfile = useAppStore((state) => state.setUserProfile);
  const [values, setValues] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    let mounted = true;
    profileApi
      .get()
      .then((row) => {
        if (!mounted) return;
        setValues(row ? { ...EMPTY, ...row } : EMPTY);
        setLoadError(null);
      })
      .catch((err) => mounted && setLoadError(err))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const payload = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
          key,
          typeof value === 'string' && value.trim() === '' ? null : value
        ])
      );
      delete payload.id;
      delete payload.updated_at;
      const saved = await profileApi.save(payload);
      setUserProfile(saved);
      setSnackbar({ message: 'Profile saved', severity: 'success' });
    } catch (err) {
      setSaveError(err.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight={800}>
          Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Single source of truth for your identity across the site.
        </Typography>
      </Box>

      {loadError && (
        <Alert severity="error">Could not load profile: {String(loadError.message || loadError)}</Alert>
      )}
      {saveError && <Alert severity="error">{saveError}</Alert>}

      <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Basics
        </Typography>
        <Stack spacing={2.5}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2.5 }}>
            {BASICS.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                helperText={field.helper}
                size="small"
                value={values[field.name] ?? ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            ))}
          </Box>
          <TextField
            label="Roles"
            helperText="One role per line — used by the typewriter effect"
            multiline
            minRows={3}
            size="small"
            value={(values.roles ?? []).join('\n')}
            onChange={(e) =>
              handleChange(
                'roles',
                e.target.value.split('\n').map((line) => line.trim()).filter(Boolean)
              )
            }
          />
          <TextField
            label="Bio"
            multiline
            minRows={6}
            size="small"
            value={values.bio ?? ''}
            onChange={(e) => handleChange('bio', e.target.value)}
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Contact
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          {CONTACT.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              type={field.inputType || 'text'}
              size="small"
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Links
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          {LINKS.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              size="small"
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Media
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          {MEDIA.map((field) => (
            <ImageField
              key={field.name}
              label={field.label}
              accept={field.accept || 'image/*'}
              folder={field.folder}
              value={values[field.name] ?? ''}
              onChange={(v) => handleChange(field.name, v)}
            />
          ))}
        </Box>
      </Paper>

      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </Button>
      </Stack>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar?.severity || 'success'} onClose={() => setSnackbar(null)} variant="filled">
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
