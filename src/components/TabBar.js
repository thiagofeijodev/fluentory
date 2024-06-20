import React from 'react';
import {
  bundleIcon,
  ClipboardNote16Filled,
  ClipboardNote16Regular,
  TextBulletListSquare20Filled,
  TextBulletListSquare20Regular,
  AppsSettings20Filled,
  AppsSettings20Regular,
} from '@fluentui/react-icons';
import { makeStyles, Tab, TabList } from '@fluentui/react-components';
import { PAGE_ENUM, PAGES } from '../constants';

const IconClipboardText = bundleIcon(ClipboardNote16Filled, ClipboardNote16Regular);
const IconTextBulletList = bundleIcon(TextBulletListSquare20Filled, TextBulletListSquare20Regular);
const IconAppsSettings = bundleIcon(AppsSettings20Filled, AppsSettings20Regular);

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: '20px',
    'padding-bottom': '1em',
  },
});

export const TabBar = ({ initialValue = '/', onMovePage }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList
        appearance="subtle"
        defaultSelectedValue={initialValue}
        onTabSelect={(_, tab) => onMovePage(tab?.value)}
      >
        <Tab value={PAGE_ENUM.resources} icon={<IconClipboardText />}>
          {PAGES[PAGE_ENUM.resources]}
        </Tab>
        <Tab value={PAGE_ENUM.historic} icon={<IconTextBulletList />}>
          {PAGES[PAGE_ENUM.historic]}
        </Tab>
        <Tab value={PAGE_ENUM.setting} icon={<IconAppsSettings />}>
          {PAGES[PAGE_ENUM.setting]}
        </Tab>
      </TabList>
    </div>
  );
};

export default TabBar;
