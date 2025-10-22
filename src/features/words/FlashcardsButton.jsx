import { Button } from '@fluentui/react-components';
import { CardUi20Regular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

export const FlashcardsButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleFlashcards = () => {
    navigate('/app/flashcards');
  };

  return (
    <Button icon={<CardUi20Regular />} onClick={handleFlashcards}>
      {t('Flashcards')}
    </Button>
  );
};

export default FlashcardsButton;
