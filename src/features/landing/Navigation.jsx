import { useNavigate } from 'react-router-dom';
import { Button, Text, makeStyles, tokens } from '@fluentui/react-components';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    cursor: 'pointer',
    fontSize: '24px',
    fontWeight: 'bold',
    background: `linear-gradient(135deg, ${tokens.colorBrandForeground1} 0%, ${tokens.colorBrandForeground2} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    alignItems: 'center',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      opacity: 0.8,
    },
  },
  authButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'center',
  },
});

const Navigation = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={handleLogoClick}>
          Fluentory
        </div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.link}>
            <Text size={400}>Features</Text>
          </a>
          <a href="#howitworks" className={styles.link}>
            <Text size={400}>How It Works</Text>
          </a>
          <a href="#pricing" className={styles.link}>
            <Text size={400}>Pricing</Text>
          </a>
          <div className={styles.authButtons}>
            {user ? (
              <Button appearance="primary" onClick={() => navigate('/app')}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button appearance="secondary" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button appearance="primary" onClick={handleGetStarted}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
