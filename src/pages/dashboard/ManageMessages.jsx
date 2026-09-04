import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import ReplyIcon from '@mui/icons-material/Reply';
import RefreshIcon from '@mui/icons-material/Refresh';
import { messagesApi } from '../../lib/api';
import { sanitizeError } from '../../lib/errorSanitizer.js';

const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await messagesApi.list();
      setMessages(data ?? []);
      setError(null);
    } catch (err) {
      setError(sanitizeError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.read).length,
    [messages]
  );

  const openMessage = async (message) => {
    setOpenId((prev) => (prev === message.id ? null : message.id));
    if (!message.read) {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, read: true } : m))
      );
      try {
        await messagesApi.markRead(message.id, true);
      } catch (err) {
        setSnackbar({ message: sanitizeError(err), severity: 'error' });
        reload();
      }
    }
  };

  const toggleRead = async (message) => {
    const nextRead = !message.read;
    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, read: nextRead } : m))
    );
    try {
      await messagesApi.markRead(message.id, nextRead);
    } catch (err) {
      setSnackbar({ message: sanitizeError(err), severity: 'error' });
      reload();
    }
  };

  const confirmDelete = async () => {
    const message = toDelete;
    if (!message) return;
    setToDelete(null);
    try {
      await messagesApi.remove(message.id);
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
      setSnackbar({ message: 'Message deleted', severity: 'success' });
    } catch (err) {
      setSnackbar({ message: sanitizeError(err), severity: 'error' });
    }
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          Inbox
          {unreadCount > 0 && (
            <Chip
              size="small"
              color="primary"
              label={`${unreadCount} unread`}
              sx={{ ml: 1.5 }}
            />
          )}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button startIcon={<RefreshIcon />} onClick={reload}>
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="warning">
          Could not load messages: {sanitizeError(error)}
        </Alert>
      )}

      {!loading && !error && messages.length === 0 && (
        <Alert severity="info" variant="outlined">
          No messages yet. Submissions from the contact form on your site will appear here.
        </Alert>
      )}

      <List disablePadding>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              border: '1px solid',
              borderColor: message.read ? 'divider' : 'rgba(199, 112, 240, 0.45)',
              bgcolor: message.read ? 'transparent' : 'rgba(199, 112, 240, 0.06)',
              overflow: 'hidden'
            }}
          >
            <ListItemButton onClick={() => openMessage(message)} alignItems="flex-start">
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                    {!message.read && (
                      <Box
                        component="span"
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#c770f0',
                          flexShrink: 0
                        }}
                      />
                    )}
                    <Typography fontWeight={message.read ? 400 : 700}>
                      {message.name || 'Anonymous'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {message.email}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {message.message}
                    </Typography>
                    <Typography component="span" variant="caption" color="text.secondary" display="block" mt={0.5}>
                      {formatDate(message.created_at)}
                    </Typography>
                  </>
                }
              />
              <Stack direction="row" spacing={0.5} onClick={(e) => e.stopPropagation()}>
                <Tooltip title="Reply">
                  <IconButton
                    size="small"
                    component="a"
                    href={`mailto:${message.email}?subject=Re: your portfolio message`}
                    aria-label={`reply to ${message.name || message.email}`}
                  >
                    <ReplyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={message.read ? 'Mark as unread' : 'Mark as read'}>
                  <IconButton size="small" onClick={() => toggleRead(message)}>
                    {message.read ? (
                      <MarkunreadIcon fontSize="small" />
                    ) : (
                      <DraftsIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small" color="error" onClick={() => setToDelete(message)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </ListItemButton>
            <Collapse in={openId === message.id} timeout="auto" unmountOnExit>
              <Box sx={{ px: 2.5, pb: 2 }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.message}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>

      <Dialog open={Boolean(toDelete)} onClose={() => setToDelete(null)}>
        <DialogTitle>Delete message?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete the message from{' '}
            <strong>{toDelete?.name || toDelete?.email}</strong>? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToDelete(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar?.severity || 'success'}
          onClose={() => setSnackbar(null)}
          variant="filled"
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
