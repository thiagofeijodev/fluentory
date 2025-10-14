import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { TabsTemplate } from 'finance-components/templates/TabsTemplate';
import { usePages } from './hooks/usePages';

export const TabsLayout = () => {
  const pages = usePages();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = pages.find((page) => page.url === location.pathname);
    if (!page) {
      console.error('unknown page');
      return;
    }

    document.title = `Fluentory: ${page.name}`;
  }, [location.pathname]);

  return (
    <TabsTemplate pages={pages} pathname={location.pathname} navigate={navigate}>
      <Outlet />
    </TabsTemplate>
  );
};

export default TabsLayout;
