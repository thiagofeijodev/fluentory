import { useState, useEffect } from 'react';
import { fetchWordMetadataFromApi } from '../services/fetchWordMetadataFromApi';
import { wordsMetaToSynounyms } from '../transforms/wordsMetaToSynounyms';

export const useSynonyms = (words) => {
  const [enrichedWords, setEnrichedWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) {
      setEnrichedWords([]);
      return;
    }

    const process = async () => {
      setIsLoading(true);
      const enriched = await Promise.all(
        words.map(async (word) => {
          const wordMetadata = await fetchWordMetadataFromApi(word.name);
          const synonyms = await wordsMetaToSynounyms(wordMetadata);
          return { ...word, synonyms };
        }),
      );
      setEnrichedWords(enriched);
      setIsLoading(false);
    };
    process();
  }, [words]);

  return { data: enrichedWords, isLoading };
};
