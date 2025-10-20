import { Text, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingTop: tokens.spacingVerticalXXXL,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },
  columnTitle: {
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: tokens.colorNeutralForeground1,
  },
  link: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: tokens.colorBrandForeground1,
    },
  },
  divider: {
    height: '1px',
    backgroundColor: tokens.colorNeutralStroke2,
    margin: `${tokens.spacingVerticalL} 0`,
  },
  bottomContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalXXL,
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700',
    background: `linear-gradient(135deg, ${tokens.colorBrandForeground1} 0%, ${tokens.colorBrandForeground2} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  socialLinks: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
  },
  socialLink: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground2,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground,
      color: 'white',
    },
  },
  copyright: {
    fontSize: '13px',
    color: tokens.colorNeutralForeground3,
  },
  '@media (max-width: 768px)': {
    bottomContainer: {
      flexDirection: 'column',
      gap: tokens.spacingVerticalL,
      textAlign: 'center',
    },
  },
});

const Footer = () => {
  const styles = useStyles();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'How It Works', href: '#howitworks' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'API Reference', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  ];

  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        {footerSections.map((section, index) => (
          <div key={index} className={styles.column}>
            <Text className={styles.columnTitle}>{section.title}</Text>
            {section.links.map((link, i) => (
              <a key={i} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.logo}>Fluentory</div>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink} title="Twitter">
            𝕏
          </a>
          <a href="#" className={styles.socialLink} title="GitHub">
            ⚙️
          </a>
          <a href="#" className={styles.socialLink} title="LinkedIn">
            💼
          </a>
        </div>
        <Text className={styles.copyright}>&copy; 2025 Fluentory. All rights reserved.</Text>
      </div>
    </footer>
  );
};

export default Footer;
