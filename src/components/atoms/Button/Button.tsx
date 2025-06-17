import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { SpinnerIcon } from '#src/components/molecules';

import styles from './Button.module.css';
import { BtnTextPosition, ButtonSizes, ButtonTypes, ButtonVariants, IconPositions } from './lib';

type ButtonProps = {
  children: ReactNode;
  type?: ButtonTypes;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  textPosition?: BtnTextPosition;
  iconPosition?: IconPositions;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

function Button({
  children,
  type = ButtonTypes.BUTTON,
  variant = ButtonVariants.PRIMARY,
  size,
  textPosition = BtnTextPosition.CENTER,
  iconPosition = IconPositions.LEFT,
  icon,
  isLoading = false,
  isDisabled = false,
  isActive,
  className,
  onClick,
}: ButtonProps) {
  const isBtnDisabled = isDisabled || isLoading;
  const isBtnSimpleVariant = variant === ButtonVariants.SIMPLE;

  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[textPosition],
        styles[size || (isBtnSimpleVariant ? '' : ButtonSizes.MEDIUM)],
        { [styles.loading]: isLoading },
        { [styles.active]: isActive },
        className,
      )}
      type={type}
      disabled={isBtnDisabled}
      aria-disabled={isBtnDisabled}
      onClick={onClick}
    >
      {icon && iconPosition === IconPositions.LEFT && (
        <span className={styles.iconLeft}>{icon}</span>
      )}

      <span className={styles.buttonTitle}>{children}</span>

      {icon && iconPosition === IconPositions.RIGHT && (
        <span className={styles.iconRight}>{icon}</span>
      )}

      {isLoading && (
        <SpinnerIcon
          variant='circle'
          size={20}
          color={variant.toLowerCase().includes('outline') ? 'gray' : 'white'}
        />
      )}
    </button>
  );
}

export default Button;
