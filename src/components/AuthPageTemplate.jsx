import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import logo from '../../public/logo.png';

const useStyles = makeStyles({
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  logo: {
    width: '150px',
  },
});

export const AuthPageTemplate = ({ children }) => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Fluentory Logo" className={styles.logo} />
      </div>
      {children}
    </>
  );
};
