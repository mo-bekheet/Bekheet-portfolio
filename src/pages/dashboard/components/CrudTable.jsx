import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const PublishedChip = ({ value }) => (
  <Chip
    size="small"
    label={value ? 'Published' : 'Draft'}
    color={value ? 'success' : 'default'}
    variant={value ? 'filled' : 'outlined'}
  />
);

export const Thumb = ({ src, alt }) =>
  src ? (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      style={{ width: 56, height: 40, objectFit: 'cover', borderRadius: 6 }}
    />
  ) : (
    <Typography variant="caption" color="text.secondary">
      —
    </Typography>
  );

const defaultCell = (value) => {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return <PublishedChip value={value} />;
  if (Array.isArray(value)) return value.join(', ') || '—';
  const text = String(value);
  return text.length > 90 ? `${text.slice(0, 90)}…` : text;
};

export default function CrudTable({
  title,
  subtitle,
  columns,
  rows,
  loading,
  error,
  onAdd,
  onEdit,
  onDelete,
  addLabel = 'Add new',
  deleteLabel
}) {
  const nameOf = (row) => row.title || row.client_name || row.full_name || `#${row.id}`;

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
      <Toolbar sx={{ px: 2.5, py: 2, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ flexGrow: 1, minWidth: 200 }}>
          <Typography variant="h6">{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {onAdd && (
          <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
            {addLabel}
          </Button>
        )}
      </Toolbar>

      {loading && <LinearProgress />}

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {String(error.message || error)}
        </Alert>
      )}

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} sx={{ py: 5, textAlign: 'center' }}>
                  <Typography color="text.secondary">Nothing here yet. Use “{addLabel}” to create the first entry.</Typography>
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.render ? col.render(row) : defaultCell(row[col.field])}
                  </TableCell>
                ))}
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => onEdit(row)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        window.confirm(`Delete "${nameOf(row)}"? This cannot be undone.`) &&
                        onDelete(row)
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}


