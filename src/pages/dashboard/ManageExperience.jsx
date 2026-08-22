import { Typography } from '@mui/material';
import CrudSection from './CrudSection.jsx';
import { PublishedChip } from './components/CrudTable.jsx';
import { experienceApi } from '../../lib/api.js';

const columns = [
  { field: 'title', label: 'Role', render: (row) => <Typography>{row.title}</Typography> },
  { field: 'company_name', label: 'Company' },
  { field: 'date_range', label: 'Period' },
  {
    field: 'points',
    label: 'Points',
    render: (row) => (Array.isArray(row.points) ? `${row.points.length} bullets` : '—')
  },
  { field: 'sort_order', label: 'Order' },
  {
    field: 'published',
    label: 'Status',
    render: (row) => <PublishedChip value={row.published} />
  }
];

const formFields = [
  { name: 'title', label: 'Job title', required: true },
  { name: 'company_name', label: 'Company' },
  { name: 'date_range', label: 'Date range', placeholder: 'Jul 2023 - Apr 2026 · Hybrid' },
  { name: 'link', label: 'Company link' },
  { name: 'icon_bg', label: 'Icon background color', placeholder: '#c95bf5' },
  {
    name: 'icon_url',
    label: 'Company logo',
    type: 'image',
    folder: 'experience'
  },
  {
    name: 'points',
    label: 'Highlights',
    type: 'list',
    helper: 'One bullet point per line'
  },
  { name: 'sort_order', label: 'Sort order', type: 'number', helper: 'Lower numbers appear first' },
  { name: 'published', label: 'Published', type: 'switch' }
];

export default function ManageExperience() {
  return (
    <CrudSection
      api={experienceApi}
      section="experience"
      tableTitle="Experience"
      tableSubtitle="Work history timeline entries"
      columns={columns}
      formFields={formFields}
      addLabel="Add role"
      nameOfRow={(row) => `${row.title} @ ${row.company_name || '?'}`}
    />
  );
}
