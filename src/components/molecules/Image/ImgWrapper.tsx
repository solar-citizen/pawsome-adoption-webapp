import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { ImageProps } from './Image';

type ImgWrapperProps = Pick<ImageProps, 'aspectRatio' | 'style' | 'alt'> & {
  children: ReactNode;
};

function ImgWrapper({ children, aspectRatio, style, alt }: ImgWrapperProps) {
  return (
    <div
      className={clsx('relative w-full h-full overflow-hidden', aspectRatio)}
      style={style}
      role='img'
      aria-label={alt}
    >
      {children}
    </div>
  );
}

export default ImgWrapper;
