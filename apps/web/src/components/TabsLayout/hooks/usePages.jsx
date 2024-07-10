import { useLanguage } from 'finance-contexts/TranslationProvider';
import {
  IconClipboardText,
  IconTextBulletList,
  IconAppsSettings,
} from 'finance-components/atoms/Icons';

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
      name: t('Financial'),
      icon: <IconClipboardText />,
    },
    {
      url: PAGE_ENUM.account,
      name: t('Accounts'),
      icon: <IconTextBulletList />,
    },
    {
      url: PAGE_ENUM.setting,
      name: t('Settings'),
      icon: <IconAppsSettings />,
    },
  ];
};

export default usePages;
