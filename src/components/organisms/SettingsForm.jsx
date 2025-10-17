import { useTheme } from '../../hooks/useTheme';
import { themeEnumOption, translationEnumOption } from '../../contexts/constants';
import { useLanguage } from '../../hooks/useLanguage';
import { Select } from '../atoms/Select';

export const SettingsForm = () => {
  const { theme, onTheme } = useTheme();
  const { t, lng, onTraslationChange } = useLanguage();

  return (
    <>
      <Select
        label={t('Theme')}
        onChange={onTheme}
        options={Object.values(themeEnumOption)}
        value={theme}
      />
      <Select
        label={t('Language')}
        onChange={onTraslationChange}
        options={[translationEnumOption.ptBr, translationEnumOption.en]}
        value={lng}
      />
    </>
  );
};

export default SettingsForm;
