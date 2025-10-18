import { makeStyles, Spinner } from '@fluentui/react-components';
import { fetchAllWords } from '../../db';
import { EmptyStateTemplate } from '../../components/EmptyStateTemplate';
import { CardItemList } from '../../components/CardItemList';
import { useLanguage } from '../../hooks/useLanguage';
import { useQuery } from '../../hooks/useQuery';

const useStyles = makeStyles({
  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
    'list-style-type': 'none',
    margin: 0,
    padding: 0,
  },
});

export const WordList = () => {
  const styles = useStyles();
  const { t } = useLanguage();

  const { data: accounts, isLoading } = useQuery(fetchAllWords, []);

  if (isLoading) {
    return <Spinner appearance="primary" label={`${t('Loading')}...`} />;
  }

  if (!accounts.length) {
    return <EmptyStateTemplate />;
  }

  return (
    <>
      <h1>{t('Words')}:</h1>
      <ul className={styles.ul}>
        {accounts.map((item, index) => (
          <li key={index}>
            <CardItemList name={item.name} description={item.description} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default WordList;
