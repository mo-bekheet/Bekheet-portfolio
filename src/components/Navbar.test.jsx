import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar', () => {
  it('renders the brand logo image', () => {
    renderNavbar();
    const logo = screen.getByAltText('brand');
    expect(logo).toBeInTheDocument();
  });

  it('renders primary navigation links', () => {
    renderNavbar();
    ['Home', 'About', 'Projects', 'Certifications', 'Resume'].forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    });
  });

  it('links point to expected routes', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/project');
    expect(screen.getByRole('link', { name: 'Certifications' })).toHaveAttribute('href', '/certificate');
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/resume');
  });
});
