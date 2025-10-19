import { getAI, getGenerativeModel } from 'firebase/ai';
import { app } from '../firebase';

export const handleProvideSimilarWordsToAskAI = async (word) => {
  if (!word?.name) return;

  try {
    const ai = getAI(app);
    const model = getGenerativeModel(ai, { model: 'gemini-2.5-flash' });

    const prompt = `Provide 5 similar words to "${word.name}". Return only a comma-separated list of the words.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error fetching similar words:', error);
  }
};
