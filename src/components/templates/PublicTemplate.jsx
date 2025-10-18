import { makeStyles, Card, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: tokens.spacingVerticalXXL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    boxShadow: tokens.shadow16,
  },
});

export const PublicTemplate = ({ children }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Card className={styles.card}>{children}</Card>
    </div>
  );
};

export default PublicTemplate;
