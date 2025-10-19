import { PublicTemplate } from '../components/PublicTemplate';
import { fetchAllWords } from '../db/models/words';
import { useQuery } from '../hooks/useQuery';
import WordGraph from '../features/words/WordGraph';
import { useSynonyms } from '../hooks/useSynonyms';
import { Loading } from '../components/Loading';

export const WordRelationshipPage = () => {
  const { data: words, isLoading: isLoadingWords } = useQuery(fetchAllWords, []);
  const { data: wordRelationships, isLoading: isLoadingSynonyms } = useSynonyms(words);

  if (isLoadingWords || isLoadingSynonyms) {
    return <Loading />;
  }

  return (
    <PublicTemplate>
      <WordGraph data={wordRelationships} />
    </PublicTemplate>
  );
};

export default WordRelationshipPage;
