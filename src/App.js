import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { TabBar } from '@/components/TabBar';
import { EmptyState } from '@/components/EmptyState';
import { ResourceTable } from './pages/ResourceTable/ResourceTable';
import { Historic } from './pages/Historic/Historic';
import { Settings } from './pages/Settings/Settings';
import { useRoute } from '@/hooks/useRoute';
import { IS_MOBILE, PAGE_ENUM } from './constants';

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

export const App = () => {
  const styles = useStyles();
  const { currentPage, onMovePage } = useRoute();

  return (
    <div className={styles.root}>
      <TabBar initialValue={currentPage} onMovePage={onMovePage} />
      <div className={styles.page}>
        {currentPage === PAGE_ENUM.resources && <ResourceTable />}
        {currentPage === PAGE_ENUM.historic && <Historic />}
        {currentPage === PAGE_ENUM.setting && <Settings />}
        {!Object.values(PAGE_ENUM).includes(currentPage) && <EmptyState />}
      </div>
    </div>
  );
};

export default App;
