import { Logo } from '#src/components/atoms';
import { NavItems } from '#src/components/molecules';
import { routes } from '#src/lib';

function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16'>
      <div className='container mx-auto h-full flex justify-between items-center px-6'>
        <Logo containerCls='text-2xl' />

        <nav className='flex gap-6'>
          <NavItems items={routes.mainNav} variant='main' />
        </nav>
      </div>
    </header>
  );
}

export default Header;
