import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  test('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('should call onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });

  test('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );

    const button = screen.getByText('Click me');
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should have correct aria-label when provided', () => {
    render(<Button aria-label="Custom label">Click me</Button>);

    const button = screen.getByLabelText('Custom label');
    expect(button).toBeInTheDocument();
  });
});
