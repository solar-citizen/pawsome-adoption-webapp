import type { HTMLAttributes } from 'react';

function getVariantCls(variant: string) {
  const primaryCls = 'border-transparent bg-blue-500 text-white hover:bg-blue-400';
  switch (variant) {
    case 'primary':
      return primaryCls;
    case 'secondary':
      return 'border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200';
    case 'destructive':
      return 'border-transparent bg-red-500 text-white hover:bg-red-400';
    case 'outline':
      return 'border-gray-300 text-gray-600 hover:bg-gray-50';
    case 'success':
      return 'border-transparent bg-green-100 text-green-800 hover:bg-green-200';
    case 'warning':
      return 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    default:
      return primaryCls;
  }
}

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
};

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseClasses = `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs 
  font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 
  focus:ring-offset-2`;
  return (
    <div className={`${baseClasses} ${getVariantCls(variant)} ${className || ''}`} {...props} />
  );
}

export default Badge;
