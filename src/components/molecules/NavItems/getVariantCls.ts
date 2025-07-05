import type { NavItemsVariants } from './types';

export function getVariantCls(variant?: NavItemsVariants) {
  switch (variant) {
    case 'user-actions':
      return {
        li: 'hidden xl:inline-block xl:order-4 text-gray-600',
        navLink: 'p-2 hover:text-blue-600 items-center',
        activeNavLink: 'text-blue-800',
      };

    case 'main':
      return {
        li: 'hidden xl:inline-block w-max text-gray-600',
        navLink: 'hover:text-blue-600 relative items-center',
        activeNavLink: `
            text-blue-800
            before:content-[""] 
            before:block 
            before:w-2 
            before:h-2 
            before:bg-blue-600 
            before:rounded-full 
            before:absolute 
            before:left-1/2 
            before:-translate-x-1/2 
            before:bottom-[-10px] 
            before:opacity-100 
            before:transition 
            before:duration-300 
            before:ease-in-out 
            before:transform 
            before:translate-y-0 
            hover:before:translate-y-2 
            hover:before:opacity-0 
          `,
      };

    case 'footer':
      return {
        li: '',
        navLink: 'hover:text-blue-600 items-center',
        activeNavLink: '',
      };

    default:
      return {
        li: '',
        navLink: '',
        activeNavLink: '',
      };
  }
}
