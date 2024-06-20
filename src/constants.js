export const IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export const PAGE_ENUM = {
  resources: '/',
  historic: '/',
  setting: '/setting',
};

export const PAGES = {
  [PAGE_ENUM.resources]: 'Resources',
  [PAGE_ENUM.historic]: 'Historic',
  [PAGE_ENUM.setting]: 'Settings',
};

export const DEFAULT_PAGE = PAGE_ENUM.resources;
