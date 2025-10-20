import { render, screen } from '@testing-library/react';
import { TabsLayout } from './TabsLayout';
import { BrowserRouter } from 'react-router-dom';

// Helper to render with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

jest.mock('../../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => key,
  }),
}));

describe('TabsLayout Component', () => {
  test('renders the TabsLayout with provided tabs', () => {
    renderWithRouter(<TabsLayout />);
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
  });
});
