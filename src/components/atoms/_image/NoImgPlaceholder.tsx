import clsx from 'clsx';

import { type AspectRatio, PawIcon } from '#src/components/atoms';

type NoImgPlaceholderProps = {
  aspectRatio?: AspectRatio;
  className?: string;
  size?: number | string;
  color?: string;
};

function NoImgPlaceholder({
  aspectRatio = 'aspect-video',
  className,
  size,
}: NoImgPlaceholderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-white border border-gray-200',
        className,
        aspectRatio,
      )}
      style={{ width: size, height: size }}
    >
      <PawIcon className={clsx('text-gray-300', aspectRatio)} />
    </div>
  );
}

export default NoImgPlaceholder;
