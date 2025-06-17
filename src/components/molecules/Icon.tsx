import { ReactIcon, ReactIconProps, SvgIcon, SvgIconProps } from '#src/components/atoms';

type IconProps = ({ variant: 'react-icon' } & ReactIconProps) | ({ variant: 'svg' } & SvgIconProps);

function Icon({ variant, ...restProps }: IconProps) {
  return variant === 'react-icon' ? (
    <ReactIcon {...(restProps as ReactIconProps)} />
  ) : (
    <SvgIcon {...(restProps as SvgIconProps)} />
  );
}

export default Icon;
