import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@fluentui/react-components';
import { CardUi20Regular } from '@fluentui/react-icons';
import { ListPageTemplate } from '../components/ListPageTemplate';
import { QuickAddWord } from '../features/words/QuickAddWord';
import { WordList } from '../features/words/WordList';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
});

export const Home = () => {
  const navigate = useNavigate();
  const styles = useStyles();

  const handleFlashcards = () => {
    navigate('/flashcards');
  };

  return (
    <ListPageTemplate>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <QuickAddWord />
          <Button appearance="secondary" icon={<CardUi20Regular />} onClick={handleFlashcards}>
            Flashcards
          </Button>
        </div>
      </div>
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
