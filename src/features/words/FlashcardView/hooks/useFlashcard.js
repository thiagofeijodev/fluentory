import { useState, useEffect } from 'react';
import { useQuery } from '../../../hooks/useQuery';
import { fetchAllWords } from '../../../db';
import { fetchWordMetadataFromApi } from '../../../services/fetchWordMetadataFromApi';

export const useFlashcard = () => {
  const { data: words, isLoading: isLoadingWords } = useQuery(fetchAllWords, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [metadata, setMetadata] = useState(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  const currentWord = words?.[currentIndex];

  useEffect(() => {
    if (currentWord) {
      const fetchMetadata = async () => {
        setIsLoadingMetadata(true);
        setMetadata(null);
        try {
          const data = await fetchWordMetadataFromApi(currentWord.name);

          // Extract the most useful information.
          const metadata = (data || []).map((entry) => {
            return {
              word: entry.meta.id,
              fl: entry.fl,
              shortdef: entry.shortdef,
            };
          });
          setMetadata(metadata);
        } catch (error) {
          console.error('Failed to fetch word metadata:', error);
          setMetadata([]);
        } finally {
          setIsLoadingMetadata(false);
        }
      };
      fetchMetadata();
    }
  }, [currentWord]);

  const handleNext = () => {
    if (!words || words.length === 0) return;
    if (shuffled) {
      setCurrentIndex(Math.floor(Math.random() * words.length));
      return;
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    if (!words || words.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  const handleShuffle = () => {
    setShuffled((s) => !s);
  };

  return {
    words,
    isLoadingWords,
    currentWord,
    currentIndex,
    metadata,
    isLoadingMetadata,
    shuffled,
    handleNext,
    handlePrev,
    handleShuffle,
  };
};
