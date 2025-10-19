import { render, screen } from '@testing-library/react';
import { Persona } from './Persona';

describe('Persona Component', () => {
  const mockPersona = {
    name: 'John Doe',
    secondaryText: 'john.doe@example.com',
    avatar: {
      image: {
        src: 'https://example.com/avatar.jpg',
      },
    },
  };

  test('renders persona information', () => {
    render(<Persona {...mockPersona} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });
});
