import { render, screen, fireEvent } from '@testing-library/react';
import { CardItemList } from './CardItemList';

describe('CardItemList Component', () => {
  const mockProps = {
    name: 'Test Item',
    description: 'Test Description',
    status: 'learning',
    onStatusChange: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  test('renders the component with provided props', () => {
    render(<CardItemList {...mockProps} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Learning')).toBeInTheDocument();
  });

  test('calls onStatusChange when status button is clicked', () => {
    render(<CardItemList {...mockProps} />);
    const statusButton = screen.getByRole('button', { name: 'Mark as learned' });
    fireEvent.click(statusButton);
    expect(mockProps.onStatusChange).toHaveBeenCalledWith('learned');
  });

  test('calls onEdit when edit button is clicked', () => {
    render(<CardItemList {...mockProps} />);
    const editButton = screen.getByRole('button', { name: 'Edit word' });
    fireEvent.click(editButton);
    expect(mockProps.onEdit).toHaveBeenCalled();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<CardItemList {...mockProps} />);
    const deleteButton = screen.getByRole('button', { name: 'Delete word' });
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalled();
  });

  test('displays "Learned" and changes icon when status is "learned"', () => {
    render(<CardItemList {...mockProps} status="learned" />);
    expect(screen.getByText('Learned')).toBeInTheDocument();
    const statusButton = screen.getByRole('button', { name: 'Mark as learning' });
    expect(statusButton).toBeInTheDocument();
  });
});
