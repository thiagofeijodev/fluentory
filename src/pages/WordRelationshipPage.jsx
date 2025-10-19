import { useNavigate } from 'react-router-dom';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { PublicTemplate } from '../components/PublicTemplate';
import { fetchAllWords } from '../db/models/words';
import { useQuery } from '../hooks/useQuery';
import { WordGraph } from '../features/words/WordGraph';
import { useSynonyms } from '../hooks/useSynonyms';
import { Loading } from '../components/Loading';
import { useLanguage } from '../hooks/useLanguage';

const useStyles = makeStyles({
  backButton: {
    position: 'absolute',
    top: tokens.spacingVerticalXXL,
    left: tokens.spacingHorizontalXXL,
    zIndex: 1,
  },
});

export const WordRelationshipPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: words, isLoading: isLoadingWords } = useQuery(fetchAllWords, []);
  const { data: wordRelationships, isLoading: isLoadingSynonyms } = useSynonyms(words);

  const handleBack = () => navigate('/');

  if (isLoadingWords || isLoadingSynonyms) {
    return <Loading />;
  }

  return (
    <PublicTemplate>
      <Button
        className={styles.backButton}
        appearance="primary"
        icon={<ArrowLeft24Regular />}
        onClick={handleBack}
      >
        {t('Back to Home')}
      </Button>
      <WordGraph data={wordRelationships} />
    </PublicTemplate>
  );
};

export default WordRelationshipPage;
