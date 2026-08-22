import { Link, Typography } from '@mui/material';
import CrudSection from './CrudSection.jsx';
import { PublishedChip, Thumb } from './components/CrudTable.jsx';
import { testimonialsApi } from '../../lib/api.js';

const columns = [
  {
    field: 'avatar_url',
    label: 'Photo',
    render: (row) => <Thumb src={row.avatar_url} alt={row.client_name} />
  },
  { field: 'client_name', label: 'Name', render: (row) => <Typography>{row.client_name}</Typography> },
  {
    field: 'profession',
    label: 'Profession'
  },
  {
    field: 'quote',
    label: 'Quote',
    render: (row) =>
      row.quote ? (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
          {row.quote.length > 110 ? `${row.quote.slice(0, 110)}…` : row.quote}
        </Typography>
      ) : (
        '—'
      )
  },
  {
    field: 'link',
    label: 'Link',
    render: (row) =>
      row.link ? (
        <Link href={row.link} target="_blank" rel="noopener noreferrer">
          Profile
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
  { name: 'client_name', label: 'Name', required: true },
  { name: 'profession', label: 'Profession / role' },
  { name: 'quote', label: 'Quote', type: 'textarea', rows: 5, required: true },
  { name: 'avatar_url', label: 'Photo', type: 'image', folder: 'testimonials' },
  { name: 'link', label: 'LinkedIn or website link' },
  { name: 'sort_order', label: 'Sort order', type: 'number', helper: 'Lower numbers appear first' },
  { name: 'published', label: 'Published', type: 'switch' }
];

export default function ManageTestimonials() {
  return (
    <CrudSection
      api={testimonialsApi}
      tableTitle="Testimonials"
      tableSubtitle="Recommendations shown on the home page slider"
      columns={columns}
      formFields={formFields}
      addLabel="Add testimonial"
      nameOfRow={(row) => row.client_name || `#${row.id}`}
    />
  );
}
