import { IoCloseOutline } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import { PiMagnifyingGlassLight } from 'react-icons/pi'

import { IconColor, IconName, IconSize } from './types'

// Map each icon name to a react-icons component.
export const iconMap: Record<IconName, IconType> = {
  close: IoCloseOutline,
  search: PiMagnifyingGlassLight,
}

// Define Tailwind CSS classes for sizing.
export const sizeClasses: Record<IconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

// Define Tailwind CSS classes for colors.
export const colorClasses: Record<IconColor, string> = {
  primary: 'text-white',
  secondary: 'text-gray-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-cyan-500',
}
