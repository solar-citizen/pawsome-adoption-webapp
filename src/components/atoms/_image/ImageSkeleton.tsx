import clsx from 'clsx';
import ContentLoader from 'react-content-loader';

type ImageSkeletonProps = {
  className?: string;
  aspectRatio?: AspectRatio;
};
export type AspectRatio = 'aspect-square' | 'aspect-video';

const DIMENSIONS = {
  ['aspect-square']: { viewBox: '0 0 300 300', w: 292, h: 292 },
  ['aspect-video']: { viewBox: '0 0 320 180', w: 312, h: 172 },
};

function ImageSkeleton({ aspectRatio = 'aspect-video', className }: ImageSkeletonProps) {
  const { viewBox, w, h } = DIMENSIONS[aspectRatio];
  return (
    <div
      className={clsx('absolute inset-0 w-full h-full', className)}
      aria-hidden='true'
      role='presentation'
    >
      <ContentLoader
        speed={2}
        viewBox={viewBox}
        width='100%'
        height='100%'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        preserveAspectRatio='xMidYMid meet'
      >
        <rect x='4' y='4' rx='4' ry='4' width={w} height={h} />
      </ContentLoader>
    </div>
  );
}

export default ImageSkeleton;
