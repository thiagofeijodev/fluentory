import React, { useState } from 'react';
import { DEFAULT_PAGE, PAGES } from '../constants';

export const useRoute = () => {
  const searchParams = new URLSearchParams(document?.location?.search);
  const pageParams = searchParams.get('p') || DEFAULT_PAGE;

  const [currentPage, setCurrentPage] = useState(pageParams);

  const onMovePage = (page) => {
    if (!PAGES[page]) {
      console.error('unknown page');
    }

    const pageName = `SaaS: ${PAGES[page]}`;

    const url = new URL(location);
    url.searchParams.set('p', page);

    document.title = pageName;
    window.history.pushState({ pageTitle: pageName }, '', url);

    setCurrentPage(page);
  };

  return {
    currentPage,
    onMovePage,
  };
};

export default useRoute;
