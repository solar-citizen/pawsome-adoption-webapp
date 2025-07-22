import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '#src/components/templates/MainLayout';
import { routes } from '#src/lib';
import { AboutPage, AdoptionsPage, ContactPage, HomePage, PetDetails } from '#src/pages';

const { rStatic, rDynamic } = routes;

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Navigate to={rStatic.mainNav.home.path} replace />} />
        <Route path={rStatic.mainNav.home.path} element={<HomePage />} />
        <Route path={rStatic.mainNav.adoptions.path} element={<AdoptionsPage />} />
        <Route path={rStatic.mainNav.about.path} element={<AboutPage />} />
        <Route path={rStatic.mainNav.contact.path} element={<ContactPage />} />
        <Route path={rDynamic.petDetails.route} element={<PetDetails />} />
        <Route path='*' element={<Navigate to={rStatic.mainNav.home.path} replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
