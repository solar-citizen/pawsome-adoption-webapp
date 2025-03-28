import { clsx } from 'clsx'

import { Icon, SvgElementProps } from '@/src/components/atoms'

import { SpinnerVariants } from './lib'
import styles from './SpinnerIcon.module.css'

type SpinnerProps = {
  variant?: SpinnerVariants
  size?: number
  color?: string
  className?: string
}

type SpinnerVariantConfig = {
  elements: SvgElementProps[]
  className?: string
}

const spinnerOptions: Record<SpinnerVariants, SpinnerVariantConfig> = {
  [SpinnerVariants.CIRCLE]: {
    elements: [
      { type: 'circle', props: { cx: 12, cy: 2.5, r: 1.5, opacity: 0.14 } },
      { type: 'circle', props: { cx: 16.75, cy: 3.77, r: 1.5, opacity: 0.29 } },
      { type: 'circle', props: { cx: 20.23, cy: 7.25, r: 1.5, opacity: 0.43 } },
      { type: 'circle', props: { cx: 21.5, cy: 12, r: 1.5, opacity: 0.57 } },
      { type: 'circle', props: { cx: 20.23, cy: 16.75, r: 1.5, opacity: 0.71 } },
      { type: 'circle', props: { cx: 16.75, cy: 20.23, r: 1.5, opacity: 0.86 } },
      { type: 'circle', props: { cx: 12, cy: 21.5, r: 1.5, opacity: 1 } },
    ],
    className: styles.spinnerCircle,
  },
  [SpinnerVariants.BAR]: {
    elements: [
      { type: 'rect', props: { x: 1, y: 1, width: 6, height: 22, className: styles.spinnerBar } },
      { type: 'rect', props: { x: 9, y: 1, width: 6, height: 22, className: styles.spinnerBar2 } },
      { type: 'rect', props: { x: 17, y: 1, width: 6, height: 22, className: styles.spinnerBar3 } },
    ],
  },
}

const SpinnerIcon = ({ variant, size, color, className }: SpinnerProps) => {
  const { elements, className: variantClass } = spinnerOptions[variant || SpinnerVariants.CIRCLE]

  return (
    <Icon
      elements={elements}
      width={size || 20}
      height={size || 20}
      color={color || 'white'}
      className={clsx(variantClass, className)}
    />
  )
}

export default SpinnerIcon
