import { ReactIcon, ReactIconProps, SvgIcon, SvgIconProps } from '#/components/atoms'

type IconProps = ({ variant: 'react-icon' } & ReactIconProps) | ({ variant: 'svg' } & SvgIconProps)

const Icon = ({ variant, ...restProps }: IconProps) => {
  if (variant === 'react-icon') return <ReactIcon {...(restProps as ReactIconProps)} />

  return <SvgIcon {...(restProps as SvgIconProps)} />
}

export default Icon
