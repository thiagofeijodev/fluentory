import { useState, useEffect } from 'react';
import { fetchWordMetadataFromApi } from '../services/fetchWordMetadataFromApi';
import { wordsMetaToSynounyms } from '../transforms/wordsMetaToSynounyms';
import { wordsMetaToClass } from '../transforms/wordsMetaToClass';

const N_MAX_WORDS = 50;

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
      const wordsSliced = words.length > N_MAX_WORDS ? words.slice(0, N_MAX_WORDS) : words;
      const enriched = await Promise.all(
        wordsSliced.map(async (word) => {
          const wordMetadata = await fetchWordMetadataFromApi(word.name);
          const synonyms = wordsMetaToSynounyms(wordMetadata);
          const classes = wordsMetaToClass(wordMetadata);
          return { name: word.name, synonyms, classes };
        }),
      );
      setEnrichedWords(enriched);
      setIsLoading(false);
    };
    process();
  }, [words]);

  return { data: enrichedWords, isLoading };
};
