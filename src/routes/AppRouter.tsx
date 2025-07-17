import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '#src/components/templates/MainLayout';
import { routes } from '#src/lib';
import { AboutPage, AdoptionsPage, ContactPage, HomePage, PetDetails } from '#src/pages';

const { home, adoptions, contact, about, dynamic } = routes;
const { petDetails } = dynamic;

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Navigate to={home.path} replace />} />
        <Route path={home.path} element={<HomePage />} />
        <Route path={adoptions.path} element={<AdoptionsPage />} />
        <Route path={about.path} element={<AboutPage />} />
        <Route path={contact.path} element={<ContactPage />} />
        <Route path={petDetails.route} element={<PetDetails />} />
        <Route path='*' element={<Navigate to={home.path} replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
