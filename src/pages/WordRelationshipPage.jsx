import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, makeStyles, tokens } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { fetchAllWords } from '../db/models/words';
import { useQuery } from '../hooks/useQuery';
import { WordGraph } from '../features/words/WordGraph';
import { useSynonyms } from '../hooks/useSynonyms';
import { Loading } from '../components/Loading';
import { useLanguage } from '../hooks/useLanguage';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  controls: {
    position: 'absolute',
    top: tokens.spacingVerticalXXL,
    left: tokens.spacingHorizontalXXL,
    zIndex: 1,
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
});

export const WordRelationshipPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showSynonyms, setShowSynonyms] = useState(false);

  const { data: words, isLoading: isLoadingWords } = useQuery(fetchAllWords, []);
  const { data: wordRelationships, isLoading: isLoadingSynonyms } = useSynonyms(words);

  const handleBack = () => navigate('/');

  if (isLoadingWords || isLoadingSynonyms) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <Button appearance="primary" icon={<ArrowLeft24Regular />} onClick={handleBack}>
          {t('Back to Home')}
        </Button>
        <Button appearance="primary" onClick={() => setShowSynonyms(!showSynonyms)}>
          {showSynonyms ? t('Hide Synonyms') : t('Show Synonyms')}
        </Button>
      </div>
      <WordGraph data={wordRelationships} showSynonyms={showSynonyms} />
    </div>
  );
};

export default WordRelationshipPage;
