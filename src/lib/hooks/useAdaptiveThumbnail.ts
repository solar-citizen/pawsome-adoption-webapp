import { useMediaQuery } from 'usehooks-ts';

import type { Thumbnails, ThumbnailSizes } from '#src/lib';

export function useAdaptiveThumbnail(
  thumbnails: Thumbnails,
  preferences?: {
    large?: ThumbnailSizes;
    medium?: ThumbnailSizes;
    small?: ThumbnailSizes;
  },
) {
  const isLarge = useMediaQuery('(min-width: 1024px)');
  const isMedium = useMediaQuery('(min-width: 768px)');

  const sizes = {
    large: preferences?.large || '800x600',
    medium: preferences?.medium || '640x480',
    small: preferences?.small || '400x300',
  };

  if (isLarge) return thumbnails?.[sizes.large][0];
  if (isMedium) return thumbnails?.[sizes.medium][0];
  return thumbnails?.[sizes.small][0];
}
