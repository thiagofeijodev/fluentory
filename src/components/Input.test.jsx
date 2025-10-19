import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  test('renders an input with the provided label and placeholder', () => {
    render(<Input label="Email" placeholder="Enter your email" />);
    const labelElement = screen.getByText('Email');
    const inputElement = screen.getByPlaceholderText('Enter your email');
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('updates the input value when text is entered', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
