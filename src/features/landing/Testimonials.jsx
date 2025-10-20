import { Card, Text, makeStyles, tokens } from '@fluentui/react-components';

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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingHorizontalXXL,
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  testimonialCard: {
    padding: tokens.spacingVerticalXXL,
    borderRadius: '12px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow8,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  stars: {
    fontSize: '16px',
    marginBottom: tokens.spacingVerticalM,
  },
  quote: {
    fontSize: '15px',
    lineHeight: '1.6',
    fontStyle: 'italic',
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    borderLeft: `4px solid ${tokens.colorBrandForeground1}`,
    paddingLeft: tokens.spacingHorizontalL,
  },
  authorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: 'white',
    fontSize: '18px',
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  authorName: {
    fontWeight: '600',
    fontSize: '15px',
  },
  authorRole: {
    fontSize: '13px',
    color: tokens.colorNeutralForeground3,
  },
});

const Testimonials = () => {
  const styles = useStyles();

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Language Learner',
      avatar: 'SC',
      rating: 5,
      quote:
        'Fluentory completely changed how I learn languages. The flashcards are so intuitive, and the word graph helped me understand context in ways textbooks never could.',
    },
    {
      name: 'Marco Rossi',
      role: 'English Student',
      avatar: 'MR',
      rating: 5,
      quote:
        'I went from struggling with vocabulary to confidently using new words. The spaced repetition system is incredibly effective and keeps me motivated.',
    },
    {
      name: 'Yuki Tanaka',
      role: 'Professional Development',
      avatar: 'YT',
      rating: 5,
      quote:
        'Best investment for my professional growth. I now have 5000+ words in my vocabulary, and the progress tracking keeps me accountable.',
    },
  ];

  return (
    <section className={styles.root}>
      <div className={styles.titleContainer}>
        <Text as="h2" className={styles.titleText} weight="bold">
          Loved by Learners Worldwide
        </Text>
        <Text as="p" className={styles.subtitleText}>
          Join thousands of students already achieving their language goals
        </Text>
      </div>

      <div className={styles.container}>
        {testimonials.map((testimonial, index) => (
          <Card key={index} className={styles.testimonialCard}>
            <div className={styles.stars}>{'⭐'.repeat(testimonial.rating)}</div>
            <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
            <div className={styles.authorContainer}>
              <div className={styles.avatar}>{testimonial.avatar}</div>
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{testimonial.name}</div>
                <div className={styles.authorRole}>{testimonial.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
