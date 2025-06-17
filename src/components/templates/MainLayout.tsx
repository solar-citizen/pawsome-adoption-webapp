import { Outlet } from 'react-router-dom';

import { Header } from '#src/components/organisms';

import styles from './MainLayout.module.css';

function MainLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; 2025 Pawsome Adoption - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default MainLayout;
