import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { usePages } from './hooks/usePages';
import { IS_MOBILE } from 'constants';

const isMobile = IS_MOBILE.test(navigator.userAgent);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    'flex-direction': isMobile ? 'column-reverse' : 'column',
  },
  page: {
    height: '100%',
    'box-sizing': 'content-box',
  },
  tabContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: '20px',
    'padding-bottom': '1em',
  },
});

export const TabsLayout = () => {
  const styles = useStyles();
  const pages = usePages();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = pages.find((page) => page.url === location.pathname);
    if (!page) {
      console.error('unknown page');
      return;
    }

    document.title = `Finance: ${page.name}`;
  }, [location.pathname]);

  return (
    <div className={styles.root}>
      <div className={styles.tabContainer}>
        <TabList
          appearance="subtle"
          selectedValue={location.pathname || '/'}
          onTabSelect={(_, tab) => navigate(tab?.value)}
        >
          {pages.map((page) => (
            <Tab value={page.url} icon={page.icon}>
              {page.name}
            </Tab>
          ))}
        </TabList>
      </div>
      <div className={styles.page}>
        <Outlet />
      </div>
    </div>
  );
};

export default TabsLayout;
