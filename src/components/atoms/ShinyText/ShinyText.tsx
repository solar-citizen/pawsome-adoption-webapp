import clsx from 'clsx';
import { type CSSProperties, type ReactNode } from 'react';

import styles from './ShinyText.module.css';

type ShinyTextProps = {
  active: boolean;
  duration?: number;
  className?: string;
  children: ReactNode;
};

function ShinyText({ active, duration = 3, className, children }: ShinyTextProps) {
  return (
    <div
      className={clsx(styles.shinyText, active && styles.animate, className)}
      style={{ '--animation-duration': `${duration.toString()}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export default ShinyText;
