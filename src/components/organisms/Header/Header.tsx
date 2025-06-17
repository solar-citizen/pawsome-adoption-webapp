import { Link } from 'react-router-dom';

import { Logo } from '#src/components/molecules';
import { routes } from '#src/lib';

import styles from './Header.module.css';

const { adoptions, contact, about } = routes;

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo containerCls={styles.logoWrapper} />

        <nav className={styles.nav}>
          <Link to={about.path} className={styles.link}>
            {about.label}
          </Link>
          <Link to={contact.path} className={styles.link}>
            {contact.label}
          </Link>
          <Link to={adoptions.path} className={styles.link}>
            {adoptions.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
