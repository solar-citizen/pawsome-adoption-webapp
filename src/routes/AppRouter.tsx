import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '#src/components/templates/MainLayout';
import { routes } from '#src/lib';
import { AboutPage, AdoptionsPage, ContactPage, HomePage, PetDetails } from '#src/pages';

const { mainNav, dynamic } = routes;

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Navigate to={mainNav.home.path} replace />} />
        <Route path={mainNav.home.path} element={<HomePage />} />
        <Route path={mainNav.adoptions.path} element={<AdoptionsPage />} />
        <Route path={mainNav.about.path} element={<AboutPage />} />
        <Route path={mainNav.contact.path} element={<ContactPage />} />
        <Route path={dynamic.petDetails.route} element={<PetDetails />} />
        <Route path='*' element={<Navigate to={mainNav.home.path} replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
