import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import dashboardTheme from './theme.js';
import { signIn } from '../../lib/auth.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';
import { useAuth } from '../../hooks/useAuth.jsx';

const friendlyError = (message) => {
  if (!isSupabaseConfigured) {
    return 'Supabase is not configured. Add VITE_SUPABASE_ANON_KEY to .env and restart the dev server.';
  }
  if (/invalid login credentials/i.test(message)) return 'Invalid email or password.';
  if (/email not confirmed/i.test(message)) return 'Email not confirmed yet. Confirm it in the Supabase dashboard.';
  return message;
};

export default function Login() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (currentUser) {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const { error: authError } = await signIn({ email: email.trim(), password });
      if (authError) {
        setError(friendlyError(authError.message));
        return;
      }
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          background:
            'radial-gradient(1200px 600px at 80% -10%, rgba(199, 112, 240, 0.18), transparent), radial-gradient(800px 500px at 10% 110%, rgba(201, 91, 245, 0.12), transparent), #0b0b14'
        }}
      >
        <Card elevation={8} sx={{ width: '100%', maxWidth: 420 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={1} alignItems="center" sx={{ mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(199, 112, 240, 0.15)',
                  border: '1px solid rgba(199, 112, 240, 0.4)'
                }}
              >
                <LockIcon color="primary" />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                Bekheet Admin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to manage portfolio content
              </Typography>
            </Stack>

            <Stack component="form" onSubmit={handleSubmit} spacing={2.5}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoComplete="username"
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" aria-label="toggle password visibility">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button type="submit" variant="contained" size="large" disabled={submitting} startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}>
                {submitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </Stack>

            <Typography variant="caption" color="text.secondary" display="block" textAlign="center" sx={{ mt: 3 }}>
              Admin accounts are created in the Supabase dashboard ·{' '}
              <RouterLink to="/" style={{ color: '#c770f0', textDecoration: 'none' }}>
                Back to site
              </RouterLink>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}
