import { useNavigate } from 'react-router-dom';
import { Text, Button, makeStyles, tokens } from '@fluentui/react-components';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

const useStyles = makeStyles({
  root: {
    background: `linear-gradient(135deg, ${tokens.colorNeutralBackground1} 0%, ${tokens.colorNeutralBackground2} 100%)`,
    paddingTop: '96px',
    paddingBottom: '96px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalXXXL,
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  headline: {
    fontSize: '56px',
    fontWeight: '700',
    lineHeight: '1.2',
    background: `linear-gradient(135deg, ${tokens.colorBrandForeground1} 0%, ${tokens.colorBrandForeground2} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '18px',
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.6',
  },
  ctaButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalL,
    flexWrap: 'wrap',
  },
  demoArea: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '12px',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: tokens.spacingHorizontalXXL,
    gap: tokens.spacingVerticalL,
  },
  imagePlaceholder: {
    width: '100%',
    height: '300px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
  },
  '@media (max-width: 768px)': {
    '& .container': {
      gridTemplateColumns: '1fr',
    },
    '& .headline': {
      fontSize: '40px',
    },
  },
});

const Hero = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();

  const handleButtonClick = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  const buttonText = user ? t('Go to Dashboard') : t('Get Started for Free');

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>{t('Master Any Language with Fluentory')}</h1>
          <p className={styles.subtitle}>
            {t(
              'The smart way to build your vocabulary and achieve fluency. Learn faster with AI-powered flashcards and interactive word relationships.',
            )}
          </p>
          <div className={styles.ctaButtons}>
            <Button
              appearance="primary"
              size="large"
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {buttonText}
            </Button>
            <Button
              appearance="secondary"
              size="large"
              onClick={() =>
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('Learn More')}
            </Button>
          </div>
        </div>
        <div className={styles.demoArea}>
          <div className={styles.imagePlaceholder}>
            <div>
              <Text size={500} weight="semibold" style={{ marginBottom: tokens.spacingVerticalM }}>
                📸 Hero Visual Here
              </Text>
              <Text size={400} style={{ color: tokens.colorNeutralForeground3 }}>
                Add your app screenshot, video, or demo image
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
