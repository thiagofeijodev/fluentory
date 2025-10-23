import { useState, useEffect } from 'react';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { remoteConfig } from '../db/firebase';

export const useRemoteConfig = () => {
  const [config, setConfig] = useState({
    maxWordsLimit: 100, // Default value
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeRemoteConfig = async () => {
      try {
        // Fetch and activate the latest configuration
        await fetchAndActivate(remoteConfig);

        // Get the max words limit value
        const maxWordsLimit = getValue(remoteConfig, 'max_words_limit');

        setConfig({
          maxWordsLimit: maxWordsLimit.asNumber(),
        });
      } catch (error) {
        console.error('Error fetching remote config:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    initializeRemoteConfig();
  }, []);

  return { config, isLoading };
};
