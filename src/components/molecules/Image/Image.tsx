import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';

import { type AspectRatio, ImageSkeleton, NoImgPlaceholder } from '#src/components/atoms';

import { useImageLoadStatus } from './useImageLoadStatus';

type ImageProps = {
  src?: string;
  alt: string;
  aspectRatio?: AspectRatio;
  fallbackSrc?: string;
  retryCount?: number;
  loading?: 'lazy' | 'eager';
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onLoad' | 'onError'>;

function Image({
  src,
  alt,
  aspectRatio = 'aspect-video',
  className,
  style,
  fallbackSrc,
  retryCount,
  loading,
  ...rest
}: ImageProps) {
  const { currentSrc, status, handleLoad, handleError } = useImageLoadStatus({
    src: src ?? '',
    fallbackSrc,
    retryCount,
  });

  if (!src && !fallbackSrc) {
    return (
      <div
        className='relative w-full h-full'
        style={style}
        role='img'
        aria-label={alt}
        aria-busy={status === 'loading'}
      >
        <NoImgPlaceholder aspectRatio={aspectRatio} className={className} />
      </div>
    );
  }

  return (
    <div
      className='relative w-full h-full'
      aria-busy={status === 'loading'}
      role='img'
      aria-label={alt}
      style={style}
    >
      {status === 'loading' && <ImageSkeleton aspectRatio={aspectRatio} />}

      {status !== 'error' && (
        <img
          {...rest}
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={clsx(
            'transition-opacity duration-300',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
            aspectRatio,
          )}
          loading={loading ?? 'eager'}
        />
      )}

      {status !== 'loading' && status === 'error' && (
        <NoImgPlaceholder aspectRatio={aspectRatio} className={className} />
      )}
    </div>
  );
}

export default Image;
