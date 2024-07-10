import React from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    'box-sizing': 'border-box',
    padding: '5%',
    '@media (min-width: 1024px)': {
      padding: '5% 30%',
    },
  },
});

export const ListPageTemplate = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
};

export default ListPageTemplate;
