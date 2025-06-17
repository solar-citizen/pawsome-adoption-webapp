import { Outlet } from 'react-router-dom';

import { Header } from '#src/components/organisms';

function MainLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 mt-16'>
        <Outlet />
      </main>

      <footer className='bg-gray-200 py-4 text-center relative w-screen left-1/2 -translate-x-3/6'>
        <p className='text-gray-700'>&copy; 2025 Pawsome Adoption - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default MainLayout;
