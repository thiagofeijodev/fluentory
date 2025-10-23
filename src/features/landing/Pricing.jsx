import { useNavigate } from 'react-router-dom';
import { Card, Text, Button, makeStyles, tokens } from '@fluentui/react-components';
import { useAuth } from '../../hooks/useAuth';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalXXXL,
    paddingBottom: tokens.spacingVerticalXXXL,
  },
  titleContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXXL,
    textAlign: 'center',
  },
  titleText: {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: tokens.spacingVerticalM,
  },
  subtitleText: {
    fontSize: '16px',
    color: tokens.colorNeutralForeground2,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXXL,
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  card: {
    padding: tokens.spacingVerticalXXL,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    position: 'relative',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: tokens.shadow28,
    },
  },
  popularCard: {
    border: `2px solid ${tokens.colorBrandForeground1}`,
    boxShadow: tokens.shadow28,
  },
  badge: {
    position: 'absolute',
    top: '-12px',
    right: '20px',
    backgroundColor: tokens.colorBrandBackground,
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  planName: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: tokens.spacingVerticalL,
  },
  priceContainer: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  price: {
    fontSize: '42px',
    fontWeight: '700',
    marginBottom: tokens.spacingVerticalS,
  },
  period: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginBottom: tokens.spacingVerticalXXL,
    flex: 1,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '14px',
  },
  checkmark: {
    color: tokens.colorSuccessForeground1,
    fontWeight: '700',
    fontSize: '18px',
  },
  ctaButton: {
    width: '100%',
  },
  '@media (max-width: 768px)': {
    '& .container': {
      gridTemplateColumns: '1fr',
    },
  },
});

const Pricing = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTA = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'Forever free',
      features: [
        'Up to 500 words',
        'Basic flashcards',
        'Limited word graph access',
        'Mobile app access',
        'Basic analytics',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      features: [
        'Unlimited words',
        'Advanced flashcards',
        'Full word graph access',
        'Mobile app access',
        'Advanced analytics',
        'Priority support',
        'Custom learning paths',
        'Ad-free experience',
      ],
      cta: 'Go Premium',
      popular: true,
    },
  ];

  return (
    <section className={styles.root} id="pricing">
      <div className={styles.titleContainer}>
        <Text as="h2" className={styles.titleText} weight="bold">
          Simple, Transparent Pricing
        </Text>
        <Text as="p" className={styles.subtitleText}>
          Choose the plan that&apos;s right for you
        </Text>
      </div>
      <div className={styles.container}>
        {plans.map((plan, index) => (
          <Card key={index} className={`${styles.card} ${plan.popular ? styles.popularCard : ''}`}>
            {plan.popular && <div className={styles.badge}>MOST POPULAR</div>}
            <Text as="h3" className={styles.planName} weight="bold">
              {plan.name}
            </Text>
            <div className={styles.priceContainer}>
              <div className={styles.price}>{plan.price}</div>
              <div className={styles.period}>{plan.period}</div>
            </div>
            <ul className={styles.featureList}>
              {plan.features.map((feature, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.checkmark}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              appearance={plan.popular ? 'primary' : 'secondary'}
              size="large"
              className={styles.ctaButton}
              onClick={handleCTA}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
