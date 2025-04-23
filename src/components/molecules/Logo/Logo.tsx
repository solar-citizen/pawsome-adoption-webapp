import { clsx } from 'clsx'
import { NavLink } from 'react-router-dom'

import { routes } from '#/lib'

import styles from './Logo.module.css'

type LogoProps = {
  containerCls?: string
  linkCls?: string
  onClick?: () => void
}

const { home } = routes

const Logo = ({ containerCls, linkCls, onClick }: LogoProps) => (
  <h1 className={containerCls}>
    <NavLink to={home.path} className={clsx(styles.link, linkCls)} onClick={onClick}>
      <span className={styles.pawsome}>Pawsome</span> Adoption
    </NavLink>
  </h1>
)

export default Logo
