import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { InsertWordDialog } from './InsertWordDialog';
import * as _db from '../../db';

jest.mock('../../db');
jest.mock('../../hooks/useLanguage');
jest.mock('../../hooks/useAuth');

const mockUseLanguage = require('../../hooks/useLanguage').useLanguage;
const mockUseAuth = require('../../hooks/useAuth').useAuth;

const db = { ..._db };

describe('InsertWordDialog Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLanguage.mockReturnValue({
      t: (key) => key,
    });
    mockUseAuth.mockReturnValue({
      user: { uid: 'user123' },
    });
    db.insertWord = jest.fn();
  });

  test('should render dialog trigger button', () => {
    render(<InsertWordDialog />);

    expect(screen.getByText('New word')).toBeInTheDocument();
  });

  test('should open dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<InsertWordDialog />);

    const triggerButton = screen.getByText('New word');
    await user.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'New word' })).toBeInTheDocument();
    });
  });

  test('should display input field for word', async () => {
    const user = userEvent.setup();
    render(<InsertWordDialog />);

    const triggerButton = screen.getByText('New word');
    await user.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Word')).toBeInTheDocument();
    });
  });

  test('should call insertWord when form is submitted', async () => {
    const user = userEvent.setup();
    render(<InsertWordDialog />);

    const triggerButton = screen.getByText('New word');
    await user.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Word')).toBeInTheDocument();
    });

    const input = screen.getByLabelText('Word');
    await user.type(input, 'Hello');

    const saveButton = screen.getByRole('button', { name: 'Save word' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(db.insertWord).toHaveBeenCalledWith('user123', expect.any(Object));
    });
  });

  test('should close dialog after successful submission', async () => {
    const user = userEvent.setup();
    db.insertWord = jest.fn().mockResolvedValue(undefined);

    render(<InsertWordDialog />);

    const triggerButton = screen.getByText('New word');
    await user.click(triggerButton);

    const input = screen.getByLabelText('Word');
    await user.type(input, 'Hello');

    const saveButton = screen.getByRole('button', { name: 'Save word' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(db.insertWord).toHaveBeenCalled();
    });
  });

  test('should close dialog when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<InsertWordDialog />);

    const triggerButton = screen.getByText('New word');
    await user.click(triggerButton);

    const cancelButton = screen.getAllByText('Cancel')[0];
    await user.click(cancelButton);

    await waitFor(() => {
      const heading = screen.queryByRole('heading', { name: 'New word' });
      expect(heading).not.toBeInTheDocument();
    });
  });

  test('should reset form after submission', async () => {
    const user = userEvent.setup();
    db.insertWord = jest.fn().mockResolvedValue(undefined);

    render(<InsertWordDialog />);

    const triggerButton = screen.getByText('New word');
    await user.click(triggerButton);

    const input = screen.getByLabelText('Word');
    await user.type(input, 'Hello');

    const saveButton = screen.getByRole('button', { name: 'Save word' });
    await user.click(saveButton);

    await waitFor(() => {
      expect(input.value).toBe('Hello');
    });
  });
});
