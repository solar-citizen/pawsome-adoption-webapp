import clsx from 'clsx'

import { colorClasses, IconColor, iconMap, IconName, IconSize, sizeClasses } from './lib'

export type ReactIconProps = {
  name: IconName
  size?: IconSize
  color?: IconColor
  className?: string
}

function ReactIcon({ name, size = 'md', color = 'primary', className = '' }: ReactIconProps) {
  const IconComponent = iconMap[name]
  return <IconComponent className={clsx(sizeClasses[size], colorClasses[color], className)} />
}

export default ReactIcon
