import { SvgElementProps } from '#/components/atoms'

export type SpinnerVariant = 'circle' | 'bar'

export type SpinnerVariantConfig = {
  elements: SvgElementProps[]
  className?: string
}
