import { useNavigate } from 'react-router-dom';
import { FlashcardView } from '../features/words/FlashcardView';

export const Flashcards = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return <FlashcardView onBack={handleBack} />;
};

export default Flashcards;
