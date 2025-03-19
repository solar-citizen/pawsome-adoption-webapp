import styles from '../Search.module.css'
import { SearchVariants } from './enums'

const variantStylesMap: Record<SearchVariants, string> = {
  [SearchVariants.COLLAPSED]: styles.collapsed,
  [SearchVariants.EXPANDED]: styles.expanded,
  [SearchVariants.DEFAULT]: styles.default,
}

export const getSearchVariantStyles = (variant?: SearchVariants) => {
  return variantStylesMap[variant ?? SearchVariants.DEFAULT]
}
