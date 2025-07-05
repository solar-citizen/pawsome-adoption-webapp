import clsx from 'clsx';

import { MasterLink } from '#src/components/atoms';

import { getVariantCls } from './getVariantCls';
import type { NavItem, NavItemsVariants } from './types';

type NavItemsProps = {
  items: NavItem[] | Record<string, NavItem>;
  variant?: NavItemsVariants;
  onClick?: () => void;
};

function NavItems({ items, variant, onClick }: NavItemsProps) {
  const itemsArray = Array.isArray(items) ? items : Object.values(items);
  const cls = variant ? getVariantCls(variant) : getVariantCls();

  const handleClick = () => {
    onClick?.();
  };

  return (
    <>
      {itemsArray.map(({ path, label }) => (
        <li key={path} className={cls.li}>
          <MasterLink
            type='navlink'
            to={path}
            className={({ isActive }) => clsx(cls.navLink, isActive ? cls.activeNavLink : '')}
            title={label}
            onClick={handleClick}
          >
            {label}
          </MasterLink>
        </li>
      ))}
    </>
  );
}

export default NavItems;
