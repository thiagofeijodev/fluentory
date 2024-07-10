import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from './Input';

describe('Input field component', () => {
  test('User should be able to focus on input by clicking on label text', async () => {
    render(<Input name="test" />);

    await userEvent.click(screen.getByText('test'));

    const input = screen.getByLabelText('test');
    expect(input).toHaveFocus();
  });
});
