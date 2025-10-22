import { useRouteError, useNavigate } from 'react-router-dom';
import { makeStyles, tokens, Button, Text } from '@fluentui/react-components';
import { ErrorCircle24Regular } from '@fluentui/react-icons';
import { PublicTemplate } from '../components/PublicTemplate';
import { useLanguage } from '../hooks/useLanguage';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalXXL,
    height: '100%',
  },
  icon: {
    fontSize: '64px',
    color: tokens.colorPaletteRedForeground1,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
  },
  message: {
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground2,
  },
  errorDetails: {
    fontFamily: 'monospace',
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    color: tokens.colorNeutralForeground2,
    maxWidth: '600px',
    overflowX: 'auto',
  },
});

export const ErrorPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const error = useRouteError();
  const { t } = useLanguage();

  console.error(error);

  return (
    <PublicTemplate>
      <div className={styles.container}>
        <ErrorCircle24Regular className={styles.icon} />
        <Text as="h1" className={styles.title}>
          {t('Oops! Something went wrong.')}
        </Text>
        <Text as="p" className={styles.message}>
          {error.statusText ||
            error.message ||
            t("We're sorry, but an unexpected error has occurred.")}
        </Text>
        <Button appearance="primary" onClick={() => navigate('/app')}>
          {t('Go back to Home')}
        </Button>
      </div>
    </PublicTemplate>
  );
};

export default ErrorPage;
