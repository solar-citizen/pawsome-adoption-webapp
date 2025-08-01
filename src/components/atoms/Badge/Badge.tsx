import clsx from 'clsx';
import { type HTMLAttributes, type JSX, type MouseEvent, useMemo, useRef } from 'react';

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

/**
 * A flexible Badge component for displaying labels or tags.
 *
 * Features:
 * - Supports multiple visual variants (default, primary, secondary, etc.).
 * - Optional clickable behavior with keyboard support (Enter and Space keys).
 * - Ability to call back with a URL parameter update when clicked.
 * - Randomized styles when using the 'random' variant (computed once per mount).
 *
 * @param {BadgeProps} props The properties for the Badge component.
 * @returns {JSX.Element} A styled <div> acting as a badge or clickable button.
 *
 * @example
 * // Default badge
 * <Badge>New</Badge>
 *
 * @example
 * // Primary clickable badge that updates a URL parameter
 * <Badge
 *   variant="primary"
 *   isClickable
 *   paramKey="filter"
 *   paramValue={123}
 *   onParamUpdate={(key, value) => {
 *     // update logic here
 *     console.log(`Set ${key} to ${value}`);
 *   }}
 * >
 *   Filter by ID
 * </Badge>
 */
function Badge({
  className,
  variant = 'default',
  isClickable = false,
  onParamUpdate,
  paramKey,
  paramValue,
  onClick,
  ...props
}: BadgeProps): JSX.Element {
  const badgeRef = useRef<HTMLDivElement>(null);

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
