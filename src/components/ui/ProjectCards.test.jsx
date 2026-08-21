import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectCards from '../Projects/ProjectCards.jsx';

const baseProps = {
  imgPath: 'test.png',
  title: 'CardioAI',
  description: 'Heart disease detection from ECG signals.',
  ghLink: 'https://github.com/test/repo'
};

describe('ProjectCards', () => {
  it('renders title and description', () => {
    render(<ProjectCards {...baseProps} />);
    expect(screen.getByText('CardioAI')).toBeInTheDocument();
    expect(screen.getByText(/Heart disease detection/)).toBeInTheDocument();
  });

  it('renders a GitHub button by default', () => {
    render(<ProjectCards {...baseProps} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('href', baseProps.ghLink);
    expect(btn).toHaveTextContent('GitHub');
  });

  it('renders a Blog button when isBlog is true', () => {
    render(<ProjectCards {...baseProps} isBlog />);
    expect(screen.getByRole('button')).toHaveTextContent('Blog');
  });

  it('renders a Demo button when demoLink provided', () => {
    render(<ProjectCards {...baseProps} demoLink="https://demo.example.com" />);
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });

  it('does not render Demo button without demoLink', () => {
    render(<ProjectCards {...baseProps} />);
    expect(screen.queryByText('Demo')).not.toBeInTheDocument();
  });
});
