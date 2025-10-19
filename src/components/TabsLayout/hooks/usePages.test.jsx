import { renderHook } from '@testing-library/react';
import { usePages, PAGE_ENUM } from './usePages';

jest.mock('../../../hooks/useLanguage', () => ({
  useLanguage: () => ({
    t: (key) => `mocked translation for ${key}`,
  }),
}));

describe('usePages Hook', () => {
  test('returns an array of pages with mocked translations', () => {
    const { result } = renderHook(() => usePages());
    const pages = result.current;

    expect(pages).toEqual([
      { url: PAGE_ENUM.resources, name: 'mocked translation for Home', icon: expect.anything() },
      { url: PAGE_ENUM.setting, name: 'mocked translation for Settings', icon: expect.anything() },
    ]);
  });
});
