import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';

import { routes } from '#src/lib';

type LogoProps = {
  containerCls?: string;
  linkCls?: string;
  onClick?: () => void;
};

const { mainNav } = routes;

function Logo({ containerCls, linkCls, onClick }: LogoProps) {
  return (
    <div className={containerCls}>
      <NavLink
        to={mainNav.home.path}
        className={clsx(
          `text-gray-700 opacity-85 hover:opacity-100 transition 
          duration-(--transition-duration) 
          ease-(--transition-timing-function)`,
          linkCls,
        )}
        onClick={onClick}
      >
        <span className='font-semibold text-blue-600'>Pawsome</span> Adoption
      </NavLink>
    </div>
  );
}

export default Logo;
