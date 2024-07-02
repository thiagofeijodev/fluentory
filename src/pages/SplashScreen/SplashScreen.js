import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    height: '100%',
    gap: '50px',
  },
});

export const SplashScreen = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <p>loading...</p>
    </div>
  );
};

export default SplashScreen;
