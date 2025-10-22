import { useNavigate } from 'react-router-dom';
import { Button } from '@fluentui/react-components';
import { ChartMultiple20Regular } from '@fluentui/react-icons';
import { useLanguage } from '../../hooks/useLanguage';

export const WordRelationshipButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleWordRelationships = () => {
    navigate('/app/words');
  };

  return (
    <Button
      appearance="secondary"
      icon={<ChartMultiple20Regular />}
      onClick={handleWordRelationships}
    >
      {t('Word Relationships')}
    </Button>
  );
};
