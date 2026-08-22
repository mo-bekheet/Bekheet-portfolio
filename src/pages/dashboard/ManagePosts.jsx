import { Typography } from '@mui/material';
import CrudSection from './CrudSection.jsx';
import { PublishedChip } from './components/CrudTable.jsx';
import { postsApi } from '../../lib/api.js';

const columns = [
  {
    field: 'title',
    label: 'Title',
    render: (row) => <Typography>{row.title}</Typography>
  },
  { field: 'category', label: 'Category' },
  {
    field: 'date_label',
    label: 'Date',
    render: (row) =>
      row.date_label ||
      new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  },
  { field: 'read_time', label: 'Read time' },
  {
    field: 'published',
    label: 'Status',
    render: (row) => <PublishedChip value={row.published} />
  }
];

const formFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'category', label: 'Category', helper: 'e.g. Architecture, Machine Learning' },
  { name: 'date_label', label: 'Date label', helper: 'Leave empty to use creation date' },
  { name: 'read_time', label: 'Read time', placeholder: '4 min read' },
  {
    name: 'content',
    label: 'Content (Markdown)',
    type: 'textarea',
    rows: 14,
    required: true
  },
  { name: 'published', label: 'Published', type: 'switch' }
];

export default function ManagePosts() {
  return (
    <CrudSection
      api={postsApi}
      tableTitle="Blog Posts"
      tableSubtitle="Markdown posts rendered on the Blog page"
      columns={columns}
      formFields={formFields}
      addLabel="New post"
      nameOfRow={(row) => row.title}
    />
  );
}
