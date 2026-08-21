import { useCallback, useEffect, useState } from 'react';

export default function useCrudPage(api) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState({ open: false, row: null });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.list();
      setRows(data ?? []);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    reload();
  }, [reload]);

  const openCreate = () => {
    setFormError(null);
    setDialog({ open: true, row: null });
  };

  const openEdit = (row) => {
    setFormError(null);
    setDialog({ open: true, row });
  };

  const closeDialog = () => setDialog((prev) => ({ ...prev, open: false }));

  const save = async (values) => {
    setSaving(true);
    setFormError(null);
    try {
      if (dialog.row) {
        await api.update(dialog.row.id, values);
        setSnackbar({ message: 'Saved', severity: 'success' });
      } else {
        await api.create(values);
        setSnackbar({ message: 'Created', severity: 'success' });
      }
      closeDialog();
      await reload();
    } catch (err) {
      setFormError(err.message || String(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row) => {
    try {
      await api.remove(row.id);
      setRows((prev) => prev.filter((r) => r.id !== row.id));
      setSnackbar({ message: 'Deleted', severity: 'success' });
    } catch (err) {
      setSnackbar({ message: err.message || String(err), severity: 'error' });
    }
  };

  return {
    rows,
    loading,
    error,
    reload,
    dialog,
    dialogKey: `${dialog.open}-${dialog.row?.id ?? 'new'}`,
    openCreate,
    openEdit,
    closeDialog,
    save,
    saving,
    remove,
    formError,
    snackbar,
    closeSnackbar: () => setSnackbar(null)
  };
}
