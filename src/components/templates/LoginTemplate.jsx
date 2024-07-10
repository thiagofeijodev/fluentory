import React from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '5px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
  },
  create: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LoginTemplate = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
};

export default LoginTemplate;
