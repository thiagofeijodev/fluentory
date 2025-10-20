import { useLanguage } from '../../../hooks/useLanguage';
import { IconClipboardText, IconAppsSettings } from '../../Icons';

export const PAGE_ENUM = {
  resources: '/app',
  account: '/accounts',
  setting: '/app/setting',
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
