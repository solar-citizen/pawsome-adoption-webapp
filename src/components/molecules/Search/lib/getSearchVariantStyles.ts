import styles from '../Search.module.css';
import { SearchVariant } from './types';

const variantStylesMap: Record<SearchVariant, string> = {
  collapsed: styles.collapsed,
  expanded: styles.expanded,
  default: styles.default,
};

export function getSearchVariantStyles(variant?: SearchVariant) {
  return variantStylesMap[variant ?? 'default'];
}
