import axios from 'axios';
import { API_KEY } from './constants';

export const fetchWordMetadataFromApi = async (word) => {
  if (!word) return [];
  const url = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${API_KEY}`;

  const response = await axios.get(url);
  const data = response.data;

  return data;
};
