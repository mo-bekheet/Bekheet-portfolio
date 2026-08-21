import { Link, Typography } from '@mui/material';
import CrudSection from './CrudSection.jsx';
import { PublishedChip, Thumb } from './components/CrudTable.jsx';
import { certificationsApi } from '../../lib/api.js';

const columns = [
  {
    field: 'image_url',
    label: 'Image',
    render: (row) => <Thumb src={row.image_url} alt={row.alt || row.title} />
  },
  { field: 'title', label: 'Title', render: (row) => <Typography>{row.title}</Typography> },
  {
    field: 'issue_date',
    label: 'Issued'
  },
  {
    field: 'link',
    label: 'Link',
    render: (row) =>
      row.link && row.link !== '#' ? (
        <Link href={row.link} target="_blank" rel="noopener noreferrer">
          Verify
        </Link>
      ) : (
        '—'
      )
  },
  { field: 'sort_order', label: 'Order' },
  {
    field: 'published',
    label: 'Status',
    render: (row) => <PublishedChip value={row.published} />
  }
];

const formFields = [
  { name: 'title', label: 'Certification title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
  { name: 'image_url', label: 'Badge image URL', placeholder: 'https://…' },
  { name: 'alt', label: 'Image alt text' },
  { name: 'issue_date', label: 'Issue date', placeholder: 'Jun 2026' },
  { name: 'link', label: 'Verification link' },
  { name: 'sort_order', label: 'Sort order', type: 'number', helper: 'Lower numbers appear first' },
  { name: 'published', label: 'Published', type: 'switch' }
];

export default function ManageCertifications() {
  return (
    <CrudSection
      api={certificationsApi}
      tableTitle="Certifications"
      tableSubtitle="Certificates shown on the Certifications page"
      columns={columns}
      formFields={formFields}
      addLabel="Add certification"
    />
  );
}
