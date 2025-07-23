import clsx from 'clsx';
import { readableColor } from 'polished';
import { type HTMLAttributes, type MouseEvent, useMemo } from 'react';

import { isNotEmptyString } from '#src/lib';

import styles from './Badge.module.css';

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'success'
    | 'warning'
    | 'random'; // ← new
  isClickable?: boolean;
  onParamUpdate?: (param: string, value: string | null) => void;
  paramKey?: string;
  paramValue?: string | number | null;
};

/**
 * Returns a random pastel HSL string:
 * - Saturation: 20–40%
 * - Lightness: 80–95%
 */
function randomPastelHSL() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(20 + Math.random() * 20);
  const l = Math.floor(80 + Math.random() * 15);
  return `hsl(${h.toString()}, ${s.toString()}%, ${l.toString()}%)`;
}

/**
 * Builds inline styles for the "random" variant.
 * Only background & text color; border is transparent.
 */
function randomBadgeStyles() {
  const bg = randomPastelHSL();
  // pick black or white text for best contrast:
  const color = readableColor(bg, '#000', '#fff', false);
  return {
    backgroundColor: bg,
    color,
    borderColor: 'transparent',
  };
}

function Badge({
  className,
  variant = 'default',
  isClickable = false,
  onParamUpdate,
  paramKey,
  paramValue,
  onClick,
  ...props
}: BadgeProps) {
  // for 'random' variant, compute a pastel style once per badge:
  const randomStyles = useMemo(() => (variant === 'random' ? randomBadgeStyles() : {}), [variant]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
    if (isClickable && onParamUpdate && isNotEmptyString(paramKey)) {
      const stringValue = paramValue != null ? paramValue.toString() : null;
      const value = isNotEmptyString(stringValue) ? stringValue : null;
      onParamUpdate(paramKey, value);
    }
  };

  return (
    <div
      className={clsx(styles.badge, styles[variant], isClickable && styles.isClickable, className)}
      onClick={isClickable ? handleClick : onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      style={{
        ...randomStyles,
        ...props.style,
      }}
      {...props}
    />
  );
}

export default Badge;
