import { Alert, Snackbar, Stack } from '@mui/material';
import CrudTable from './components/CrudTable.jsx';
import CrudFormDialog from './components/CrudFormDialog.jsx';
import useCrudPage from './useCrudPage.js';

export default function CrudSection({
  api,
  tableTitle,
  tableSubtitle,
  columns,
  formFields,
  addLabel = 'Add new',
  nameOfRow = (row) => row.title || `#${row.id}`
}) {
  const page = useCrudPage(api);

  const dialogTitle = page.dialog.row ? `Edit ${nameOfRow(page.dialog.row)}` : addLabel;

  return (
    <Stack spacing={3}>
      {page.error && !page.loading && (
        <Alert severity="warning">
          Showing data may be incomplete because Supabase could not be reached.
        </Alert>
      )}

      <CrudTable
        title={tableTitle}
        subtitle={tableSubtitle}
        columns={columns}
        rows={page.rows}
        loading={page.loading}
        error={null}
        onAdd={page.openCreate}
        onEdit={page.openEdit}
        onDelete={page.remove}
        addLabel={addLabel}
      />

      <CrudFormDialog
        key={page.dialogKey}
        open={page.dialog.open}
        title={dialogTitle}
        fields={formFields}
        initialValues={page.dialog.row ?? undefined}
        onClose={page.closeDialog}
        onSubmit={page.save}
        submitting={page.saving}
        serverError={page.formError}
      />

      <Snackbar
        open={Boolean(page.snackbar)}
        autoHideDuration={3000}
        onClose={page.closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={page.snackbar?.severity || 'success'} onClose={page.closeSnackbar} variant="filled">
          {page.snackbar?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
