import { Link, Typography } from '@mui/material';
import CrudSection from './CrudSection.jsx';
import { PublishedChip, Thumb } from './components/CrudTable.jsx';
import { projectsApi } from '../../lib/api.js';

const columns = [
  {
    field: 'image_url',
    label: 'Image',
    render: (row) => <Thumb src={row.image_url} alt={row.title} />
  },
  {
    field: 'title',
    label: 'Title',
    render: (row) =>
      row.gh_link ? (
        <Link href={row.gh_link} target="_blank" rel="noopener noreferrer">
          {row.title}
        </Link>
      ) : (
        <Typography>{row.title}</Typography>
      )
  },
  { field: 'type', label: 'Type' },
  { field: 'sort_order', label: 'Order' },
  {
    field: 'published',
    label: 'Status',
    render: (row) => <PublishedChip value={row.published} />
  }
];

const formFields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
  { name: 'image_url', label: 'Image URL', placeholder: 'https://…' },
  { name: 'gh_link', label: 'GitHub link' },
  { name: 'demo_link', label: 'Demo link' },
  {
    name: 'type',
    label: 'Type',
    helper: 'e.g. original, coursework'
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'list',
    helper: 'One tag per line'
  },
  { name: 'sort_order', label: 'Sort order', type: 'number', helper: 'Lower numbers appear first' },
  { name: 'published', label: 'Published', type: 'switch' }
];

export default function ManageProjects() {
  return (
    <CrudSection
      api={projectsApi}
      tableTitle="Projects"
      tableSubtitle="Shown on the Projects page"
      columns={columns}
      formFields={formFields}
      addLabel="Add project"
    />
  );
}
