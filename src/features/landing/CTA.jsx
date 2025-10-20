import { useNavigate } from 'react-router-dom';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground,
    paddingTop: tokens.spacingVerticalXXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXL,
  },
  headline: {
    fontSize: '44px',
    fontWeight: '700',
    color: 'white',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
  },
  buttonGroup: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '12px 32px',
  },
  '@media (max-width: 768px)': {
    headline: {
      fontSize: '32px',
    },
    buttonGroup: {
      flexDirection: 'column',
    },
  },
});

const CTA = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.headline}>Ready to Transform Your Language Learning?</h2>
        <p className={styles.subtitle}>
          Join thousands of learners and start mastering vocabulary today. No credit card required
          for the free tier.
        </p>
        <div className={styles.buttonGroup}>
          <Button
            appearance="primary"
            size="large"
            onClick={handleGetStarted}
            style={{
              backgroundColor: 'white',
              color: tokens.colorBrandForeground1,
              fontWeight: '600',
            }}
          >
            Get Started Free
          </Button>
          <Button
            appearance="secondary"
            size="large"
            onClick={() =>
              document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              color: 'white',
              borderColor: 'white',
            }}
          >
            See Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
