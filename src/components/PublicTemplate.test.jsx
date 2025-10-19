import { render, screen } from '@testing-library/react';
import { PublicTemplate } from './PublicTemplate';

describe('PublicTemplate Component', () => {
  test('renders children within the template', () => {
    render(
      <PublicTemplate>
        <div>Hello World</div>
      </PublicTemplate>,
    );
    const childElement = screen.getByText('Hello World');
    expect(childElement).toBeInTheDocument();
  });
});
