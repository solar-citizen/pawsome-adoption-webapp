import type { ReactNode } from 'react';
import { Link, type LinkProps, NavLink, type NavLinkProps } from 'react-router-dom';

type BaseLinkProps = {
  to: string;
  children: ReactNode;
};

type CustomLinkProps = Omit<LinkProps, 'to'> &
  BaseLinkProps & {
    type: 'link';
  };

type CustomNavLinkProps = Omit<NavLinkProps, 'to'> &
  BaseLinkProps & {
    type: 'navlink';
  };

type MasterLinkProps = CustomLinkProps | CustomNavLinkProps;

/**
 * Link/NavLink component built over React Router's links
 *
 * @param to - The destination path
 * @param children - React children to render inside the link
 * @param type - Whether to render as 'link' or 'navlink'
 * @param props - Additional props passed to the underlying Link or NavLink component
 *
 * @example
 * // Regular Link
 * <MasterLink to="/about-us" type="link">About</MasterLink>
 *
 * @example
 * // NavLink with active styling
 * <MasterLink to="/about-us" type="navlink" className={({ isActive }) => isActive ? 'active' : ''}>
 *   About
 * </MasterLink>
 */
function MasterLink({ to, children, type, ...props }: MasterLinkProps) {
  return type === 'link' ? (
    <Link to={to} {...(props as Omit<LinkProps, 'to'>)}>
      {children}
    </Link>
  ) : (
    <NavLink to={to} {...(props as Omit<NavLinkProps, 'to'>)}>
      {children}
    </NavLink>
  );
}

export default MasterLink;
