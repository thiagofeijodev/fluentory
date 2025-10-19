import { render, screen } from '@testing-library/react';
import { SettingsTemplate } from './SettingsTemplate';

describe('SettingsTemplate Component', () => {
  test('renders children within the template', () => {
    render(
      <SettingsTemplate>
        <div>Settings Content</div>
      </SettingsTemplate>,
    );
    const childElement = screen.getByText('Settings Content');
    expect(childElement).toBeInTheDocument();
  });
});
