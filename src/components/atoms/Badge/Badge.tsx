import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './Badge.module.css';

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
};

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return <div className={clsx(styles.badge, styles[variant], className)} {...props} />;
}

export default Badge;
