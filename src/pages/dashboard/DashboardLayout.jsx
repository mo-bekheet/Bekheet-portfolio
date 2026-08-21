import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { ThemeProvider } from '@mui/material/styles';
import dashboardTheme from './theme.js';
import { signOut } from '../../lib/auth.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';

const DRAWER_WIDTH = 264;

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: <DashboardIcon />, end: true },
  { to: '/admin/profile', label: 'Profile', icon: <PersonIcon /> },
  { to: '/admin/projects', label: 'Projects', icon: <FolderOpenIcon /> },
  { to: '/admin/posts', label: 'Blog Posts', icon: <ArticleIcon /> },
  { to: '/admin/experience', label: 'Experience', icon: <WorkHistoryIcon /> },
  { to: '/admin/certifications', label: 'Certifications', icon: <WorkspacePremiumIcon /> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <FormatQuoteIcon /> }
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ px: 2.5 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" fontWeight={800} sx={{ color: '#c770f0' }}>
            Bekheet
          </Typography>
          <Typography variant="h6" fontWeight={400}>
            Admin
          </Typography>
        </Stack>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            sx={({ isActive }) => ([
              {
                borderRadius: 2,
                mb: 0.5
              },
              isActive && {
                bgcolor: 'rgba(199, 112, 240, 0.14)',
                color: '#c770f0',
                '& .MuiListItemIcon-root': { color: '#c770f0' }
              }
            ])}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Chip
          size="small"
          label={isSupabaseConfigured ? 'Supabase connected' : 'Supabase not configured'}
          color={isSupabaseConfigured ? 'success' : 'warning'}
          variant="outlined"
        />
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            background: 'rgba(11, 11, 20, 0.85)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Toolbar sx={{ gap: 1 }}>
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' } }} aria-label="open navigation">
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={700} sx={{ flexGrow: 1 }}>
              Portfolio Content Manager
            </Typography>
            <Tooltip title="View public site">
              <IconButton component="a" href="/" target="_blank" rel="noopener" aria-label="view site">
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' }
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', borderRight: '1px solid', borderColor: 'divider' }
          }}
        >
          {drawerContent}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, sm: 3.5 } }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
