import { makeStyles, Tab, TabList } from '@fluentui/react-components';

const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
const isMobile = IS_MOBILE.test(navigator.userAgent);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    'flex-direction': isMobile ? 'column-reverse' : 'column',
  },
  page: {
    height: '100%',
    'box-sizing': 'content-box',
  },
  tabContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: '20px',
    'padding-bottom': '1em',
  },
});

export const TabsTemplate = ({ children, pages, pathname, navigate }) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.tabContainer}>
        <TabList
          appearance="subtle"
          selectedValue={pathname || '/'}
          onTabSelect={(_, tab) => navigate(tab?.value)}
        >
          {pages.map((page) => (
            <Tab key={page.url} value={page.url} icon={page.icon}>
              {page.name}
            </Tab>
          ))}
        </TabList>
      </div>
      <div className={styles.page}>{children}</div>
    </div>
  );
};

export default TabsTemplate;
