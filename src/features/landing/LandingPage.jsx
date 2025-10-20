import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import CTA from './CTA';
import Footer from './Footer';
import Navigation from './Navigation';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    overflow: 'auto',
  },
});

const LandingPage = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
