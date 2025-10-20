import { Text, makeStyles, tokens } from '@fluentui/react-components';

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
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXXL,
  },
  stepCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    position: 'relative',
  },
  stepNumber: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '20px',
    color: 'white',
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '600',
  },
  stepDescription: {
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.6',
  },
  demoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalXXL,
    alignItems: 'center',
  },
  demSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  videoPlaceholder: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '12px',
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
    aspectRatio: '16 / 9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: tokens.spacingHorizontalXXL,
  },
  '@media (max-width: 768px)': {
    demoGrid: {
      gridTemplateColumns: '1fr',
    },
    stepsGrid: {
      gridTemplateColumns: '1fr',
    },
  },
});

const HowItWorks = () => {
  const styles = useStyles();

  const steps = [
    {
      title: 'Create Your Account',
      description: 'Sign up in seconds and start your learning journey with personalized settings.',
    },
    {
      title: 'Add Words to Learn',
      description: 'Import or manually add words you want to master with example sentences.',
    },
    {
      title: 'Learn with Flashcards',
      description: 'Use smart spaced repetition flashcards optimized for retention and recall.',
    },
    {
      title: 'Explore Connections',
      description: 'Visualize how words relate to each other through our interactive word graph.',
    },
  ];

  return (
    <section className={styles.root} id="howitworks">
      <div className={styles.titleContainer}>
        <Text as="h2" className={styles.titleText} weight="bold">
          How It Works
        </Text>
        <Text as="p" className={styles.subtitleText}>
          Get started in 4 simple steps
        </Text>
      </div>

      <div className={styles.container}>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <Text as="h3" className={styles.stepTitle} weight="bold">
                {step.title}
              </Text>
              <Text as="p" className={styles.stepDescription} size={400}>
                {step.description}
              </Text>
            </div>
          ))}
        </div>

        <div className={styles.demoGrid}>
          <div className={styles.demSection}>
            <Text as="h3" size={600} weight="bold">
              See It In Action
            </Text>
            <Text as="p" size={400} style={{ color: tokens.colorNeutralForeground2 }}>
              Watch how intuitive and powerful Fluentory is. Start learning your first words today
              and see how quickly you can build vocabulary.
            </Text>
          </div>
          <div className={styles.videoPlaceholder}>
            <div>
              <Text size={500} weight="semibold" style={{ marginBottom: tokens.spacingVerticalM }}>
                🎥 Demo Video Here
              </Text>
              <Text size={400} style={{ color: tokens.colorNeutralForeground3 }}>
                Add a walkthrough or tutorial video
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
