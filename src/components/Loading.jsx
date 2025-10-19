import { makeStyles, Spinner } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export const Loading = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Spinner />
    </div>
  );
};

export default Loading;
