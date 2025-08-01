import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';
import { Img } from 'react-image';

import { type AspectRatio, ImageSkeleton, NoImgPlaceholder } from '#src/components/atoms';

import ImgWrapper from './ImgWrapper';

export type ImageProps = {
  src?: string;
  thumbnailSrc?: string;
  alt: string;
  aspectRatio?: AspectRatio;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onLoad' | 'onError'>;

function Image({
  src,
  thumbnailSrc,
  alt,
  aspectRatio = 'aspect-video',
  className,
  style,
  fallbackSrc,
  loading = 'eager',
  ...rest
}: ImageProps) {
  // If no URLs at all, show placeholder immediately
  if (!src && !fallbackSrc) {
    return (
      <ImgWrapper aspectRatio={aspectRatio} style={style} alt={alt}>
        <NoImgPlaceholder className='absolute inset-0 w-full h-full' />
      </ImgWrapper>
    );
  }

  const srcList = [src, fallbackSrc].filter(Boolean) as string[];

  return (
    <ImgWrapper aspectRatio={aspectRatio} style={style} alt={alt}>
      {/* 1) loader = our blurred thumb or skeleton */}
      <Img
        {...rest}
        src={srcList}
        alt={alt}
        loading={loading}
        className={clsx(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100',
          className,
        )}
        loader={
          <div className='absolute inset-0 w-full h-full'>
            {thumbnailSrc ? (
              <img
                src={thumbnailSrc}
                alt={alt}
                className={clsx('w-full h-full object-cover filter blur-md', className)}
              />
            ) : (
              <ImageSkeleton className='w-full h-full' />
            )}
          </div>
        }
        unloader={<NoImgPlaceholder className='absolute inset-0 w-full h-full' />}
      />
    </ImgWrapper>
  );
}

export default Image;
