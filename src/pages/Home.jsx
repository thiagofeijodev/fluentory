import { useNavigate } from 'react-router-dom';
import { Button, makeStyles } from '@fluentui/react-components';
import { CardUi20Regular } from '@fluentui/react-icons';
import { ListPageTemplate } from '../components/ListPageTemplate';
import { InsertWordDialog } from '../features/words/InsertWordDialog';
import { WordList } from '../features/words/WordList';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
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
      <div className={styles.buttonContainer}>
        <InsertWordDialog />
        <Button appearance="secondary" icon={<CardUi20Regular />} onClick={handleFlashcards}>
          Flashcards
        </Button>
      </div>
      <WordList />
    </ListPageTemplate>
  );
};

export default Home;
