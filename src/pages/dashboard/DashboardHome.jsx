import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';
import { fetchCounts } from '../../lib/api.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';
import useAppStore from '../../store/useAppStore.js';

const STAT_CARDS = [
  { key: 'projects', label: 'Projects', to: '/admin/projects', icon: <FolderOpenIcon color="primary" /> },
  { key: 'posts', label: 'Blog Posts', to: '/admin/posts', icon: <ArticleIcon color="primary" /> },
  { key: 'experience', label: 'Experience', to: '/admin/experience', icon: <WorkHistoryIcon color="primary" /> },
  { key: 'certifications', label: 'Certifications', to: '/admin/certifications', icon: <WorkspacePremiumIcon color="primary" /> },
  { key: 'testimonials', label: 'Testimonials', to: '/admin/testimonials', icon: <FormatQuoteIcon color="primary" /> }
];

export default function DashboardHome() {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userProfile = useAppStore((state) => state.userProfile);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchCounts()
      .then((data) => mounted && setCounts(data))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          Welcome back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Manage everything that appears on your portfolio from one place.
        </Typography>
      </Box>

      {!isSupabaseConfigured && (
        <Alert severity="warning">
          Supabase keys are missing. Add <strong>VITE_SUPABASE_ANON_KEY</strong> to <strong>.env</strong> and restart the dev server.
        </Alert>
      )}

      {error && (
        <Alert severity="error">
          Could not load counts: {String(error.message || error)}
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2
        }}
      >
        <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
          <Stack spacing={1}>
            <PersonIcon color="primary" />
            <Typography variant="h6" fontWeight={700} noWrap>
              {userProfile?.full_name || 'Not set'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Profile ·{' '}
              <RouterLink to="/admin/profile" style={{ color: '#c770f0', textDecoration: 'none' }}>
                edit
              </RouterLink>
            </Typography>
          </Stack>
        </Paper>

        {STAT_CARDS.map((card) => (
          <Paper
            key={card.key}
            elevation={0}
            component={RouterLink}
            to={card.to}
            sx={{
              p: 2.5,
              textDecoration: 'none',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'border-color .2s',
              '&:hover': { borderColor: '#c770f0' }
            }}
          >
            <Stack spacing={1}>
              {card.icon}
              <Typography variant="h4" fontWeight={800}>
                {loading ? '…' : counts?.[card.key] ?? '—'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.label}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Stack>
  );
}
