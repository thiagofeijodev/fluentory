import {
  bundleIcon,
  ClipboardNote16Filled,
  ClipboardNote16Regular,
  TextBulletListSquare20Filled,
  TextBulletListSquare20Regular,
  AppsSettings20Filled,
  AppsSettings20Regular,
} from '@fluentui/react-icons';
import { useLanguage } from 'contexts/TranslationProvider';

export const PAGE_ENUM = {
  resources: '/',
  account: '/accounts',
  setting: '/setting',
};

export const usePages = () => {
  const { t } = useLanguage();

  const IconClipboardText = bundleIcon(ClipboardNote16Filled, ClipboardNote16Regular);
  const IconTextBulletList = bundleIcon(
    TextBulletListSquare20Filled,
    TextBulletListSquare20Regular,
  );
  const IconAppsSettings = bundleIcon(AppsSettings20Filled, AppsSettings20Regular);

  return [
    {
      url: PAGE_ENUM.resources,
      name: t('Resources'),
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
