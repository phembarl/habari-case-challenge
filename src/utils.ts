import type { IconType } from 'react-icons';
import {
  MdTrendingUp,
  MdAnalytics,
  MdBusiness,
  MdWork,
  MdPeople,
  MdPhoneIphone,
  MdRocket,
  MdApps,
  MdPages,
  MdSettings,
  MdArticle,
  MdGroup,
  MdMenuBook,
} from 'react-icons/md';

export interface NavigationItem {
  name: string;
  icon: IconType;
  active: boolean;
  hasDropdown: boolean;
  isExpanded?: boolean;
  submenu?: SubmenuItem[];
  route?: string;
}

export interface SubmenuItem {
  name: string;
  active: boolean;
  route: string;
}

export const navigationItems: NavigationItem[] = [
  { name: 'Marketing', icon: MdTrendingUp, active: false, hasDropdown: false, route: '/marketing' },
  { name: 'Analytics', icon: MdAnalytics, active: false, hasDropdown: false, route: '/analytics' },
  { name: 'Business', icon: MdBusiness, active: false, hasDropdown: false, route: '/business' },
  { name: 'Project', icon: MdWork, active: false, hasDropdown: false, route: '/project' },
  { name: 'HRM', icon: MdPeople, active: false, hasDropdown: false, route: '/hrm' },
  { name: 'Mobile App', icon: MdPhoneIphone, active: false, hasDropdown: false, route: '/mobile-app' },
  { name: 'Landingpage', icon: MdRocket, active: false, hasDropdown: false, route: '/landingpage' },
  {
    name: 'Components',
    icon: MdApps,
    active: false,
    hasDropdown: true,
    isExpanded: false,
    submenu: [
      { name: 'Overview', active: false, route: '/components/overview' }
    ]
  },
  {
    name: 'Pages',
    icon: MdPages,
    active: false,
    hasDropdown: true,
    isExpanded: false,
    submenu: [
      { name: 'Landing', active: false, route: '/pages/landing' }
    ]
  },
  {
    name: 'Apps',
    icon: MdSettings,
    active: false,
    hasDropdown: true,
    isExpanded: true,
    submenu: [
      { name: 'Calendar', active: false, route: '/apps/calendar' },
      { name: 'Email', active: true, route: '/apps/email' },
      { name: 'Invoice', active: false, route: '/apps/invoice' },
      { name: 'Charts', active: false, route: '/apps/charts' },
      { name: 'Widgets', active: false, route: '/apps/widgets' }
    ]
  },
  {
    name: 'Content',
    icon: MdArticle,
    active: false,
    hasDropdown: true,
    isExpanded: false,
    submenu: [
      { name: 'Articles', active: false, route: '/content/articles' }
    ]
  },
  {
    name: 'Users',
    icon: MdGroup,
    active: false,
    hasDropdown: true,
    isExpanded: false,
    submenu: [
      { name: 'List', active: false, route: '/users/list' }
    ]
  },
  {
    name: 'Documentation',
    icon: MdMenuBook,
    active: false,
    hasDropdown: true,
    isExpanded: false,
    submenu: [
      { name: 'Getting Started', active: false, route: '/documentation/getting-started' }
    ]
  },
];
