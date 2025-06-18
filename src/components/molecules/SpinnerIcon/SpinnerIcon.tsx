import { clsx } from 'clsx';

import { Icon } from '#src/components/molecules';

import { createSpinnerOptions } from './createSpinnerOptions';
import styles from './SpinnerIcon.module.css';
import { SpinnerVariant } from './types';

type SpinnerProps = {
  variant?: SpinnerVariant;
  size?: number;
  color?: string;
  className?: string;
};

const options = createSpinnerOptions({
  spinnerCircle: styles.spinnerCircle,
  spinnerBar: [styles.spinnerBar, styles.spinnerBar2, styles.spinnerBar3],
});

function SpinnerIcon({
  variant = 'circle',
  size = 20,
  color = 'white',
  className = '',
}: SpinnerProps) {
  const { elements, className: variantClass } = options[variant];

  return (
    <Icon
      variant='svg'
      elements={elements}
      width={size}
      height={size}
      color={color}
      className={clsx(variantClass, className)}
    />
  );
}

export default SpinnerIcon;
