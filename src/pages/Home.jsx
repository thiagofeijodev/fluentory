import { makeStyles } from '@fluentui/react-components';
import { ListPageTemplate } from '../components/ListPageTemplate';
import { QuickAddWord } from '../features/words/QuickAddWord';
import { WordList } from '../features/words/WordList';
import { FlashcardsButton } from '../features/words/FlashcardsButton';
import { WordRelationshipButton } from '../features/words/WordRelationshipButton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '20px',
  },
});

export const Home = () => {
  const styles = useStyles();

  return (
    <ListPageTemplate>
      <div className={styles.container}>
        <QuickAddWord />
        <FlashcardsButton />
        <WordRelationshipButton />
      </div>
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
