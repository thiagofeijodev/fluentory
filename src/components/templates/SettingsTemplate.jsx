import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'box-sizing': 'border-box',
    height: '100%',
    gap: '10%',
    padding: '20vh 30%',
    '@media (max-width: 1024px)': {
      padding: '20vh 10%',
    },
  },
});

export const SettingsTemplate = ({ children }) => {
  const styles = useStyles();
  return <div className={styles.root}>{children}</div>;
};

export default SettingsTemplate;
