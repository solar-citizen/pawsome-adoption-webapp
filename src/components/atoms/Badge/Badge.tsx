import clsx from 'clsx';
import { type HTMLAttributes, type MouseEvent, useMemo, useRef } from 'react';

import { isNotEmptyString, useKeyboardEvent } from '#src/lib';

import styles from './Badge.module.css';
import { getRandomBadgeStyles } from './lib/getRandomBadgeStyles';

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'success'
    | 'warning'
    | 'random';
  isClickable?: boolean;
  onParamUpdate?: (param: string, value: string | null) => void;
  paramKey?: string;
  paramValue?: string | number | null;
};

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
  const badgeRef = useRef<HTMLDivElement>(null);

  // for 'random' variant, compute a style once per badge:
  const randomStyles = useMemo(
    () => (variant === 'random' ? getRandomBadgeStyles() : {}),
    [variant],
  );

  const handleClick = (e?: MouseEvent<HTMLDivElement>) => {
    if (e) {
      onClick?.(e);
    }
    if (isClickable && onParamUpdate && isNotEmptyString(paramKey)) {
      const stringValue = paramValue != null ? paramValue.toString() : null;
      const value = isNotEmptyString(stringValue) ? stringValue : null;
      onParamUpdate(paramKey, value);
    }
  };

  useKeyboardEvent(
    {
      ' ': () => {
        if (document.activeElement === badgeRef.current) {
          handleClick();
        }
      },
      Enter: () => {
        if (document.activeElement === badgeRef.current) {
          handleClick();
        }
      },
    },
    {
      enabled: isClickable,
      eventType: 'keydown',
    },
  );

  return (
    <div
      ref={badgeRef}
      className={clsx(styles.badge, styles[variant], isClickable && styles.isClickable, className)}
      onClick={
        isClickable
          ? e => {
              handleClick(e);
            }
          : onClick
      }
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
