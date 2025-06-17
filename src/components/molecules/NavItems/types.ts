export type NavItemsVariants = 'main' | 'user-actions' | 'footer';

export type NavItem = {
  label: string;
  path: string;
  variant?: NavItemsVariants;
  isBackLink?: boolean;
  withQueryReset?: boolean;
};
