import { useLanguage } from '../../../hooks/useLanguage';
import { IconClipboardText, IconAppsSettings } from '../../atoms/Icons';

export const PAGE_ENUM = {
  resources: '/',
  account: '/accounts',
  setting: '/setting',
};

export const usePages = () => {
  const { t } = useLanguage();

  return [
    {
      url: PAGE_ENUM.resources,
      name: t('Home'),
      icon: <IconClipboardText />,
    },
    {
      url: PAGE_ENUM.setting,
      name: t('Settings'),
      icon: <IconAppsSettings />,
    },
  ];
};

export default usePages;
