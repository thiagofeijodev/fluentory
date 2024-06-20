import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@fluentui/react-components';
import { TabBar } from 'components/TabBar';
import { useRoute } from 'hooks/useRoute';
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
});

export const TabLayout = () => {
  const styles = useStyles();
  const { currentPage, onMovePage } = useRoute();

  return (
    <div className={styles.root}>
      <TabBar initialValue={currentPage} onMovePage={onMovePage} />
      <div className={styles.page}>
        <Outlet />
      </div>
    </div>
  );
};

export default TabLayout;
