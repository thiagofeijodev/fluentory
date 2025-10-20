import { Card, Text, makeStyles, tokens } from '@fluentui/react-components';
import Icon from './Icon';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: tokens.shadow8,
    borderRadius: '12px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: tokens.shadow28,
    },
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacingVerticalL,
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: tokens.spacingVerticalM,
  },
  featureDescription: {
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.6',
  },
});

const Features = () => {
  const styles = useStyles();
  const features = [
    {
      icon: 'flashcards',
      title: 'Smart Flashcards',
      description: 'Learn new words efficiently with our intelligent spaced repetition system.',
    },
    {
      icon: 'graph',
      title: 'Visualize Relationships',
      description:
        'Explore word connections with our interactive graph - see how words relate to each other.',
    },
    {
      icon: 'progress',
      title: 'Track Progress',
      description: 'Stay motivated with detailed analytics and visual progress tracking.',
    },
    {
      icon: 'flashcards',
      title: 'AI-Powered Learning',
      description: 'Get personalized learning recommendations based on your level and pace.',
    },
    {
      icon: 'graph',
      title: 'Multiple Languages',
      description: 'Learn any language with our comprehensive multilingual support.',
    },
    {
      icon: 'progress',
      title: 'Learn Anywhere',
      description: 'Sync across devices and learn on your schedule, anytime, anywhere.',
    },
  ];

  return (
    <section className={styles.root} id="features">
      <div className={styles.titleContainer}>
        <Text as="h2" className={styles.titleText} weight="bold">
          Powerful Features
        </Text>
        <Text as="p" className={styles.subtitleText}>
          Everything you need to master vocabulary and achieve fluency
        </Text>
      </div>
      <div className={styles.container}>
        {features.map((feature, index) => (
          <Card key={index} className={styles.card}>
            <div className={styles.iconContainer}>
              <Icon name={feature.icon} />
            </div>
            <Text as="h3" className={styles.featureTitle} weight="bold">
              {feature.title}
            </Text>
            <Text as="p" className={styles.featureDescription} size={400}>
              {feature.description}
            </Text>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
