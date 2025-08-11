import clsx from 'clsx';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react';

import { Icon } from '#src/components/molecules';

import styles from './Carousel.module.css';
import { extractSize, normalizeSize } from './utils';

type CustomCSSProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey: (item: T) => string | number;
  options?: EmblaOptionsType;
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  itemWidth?: string | number; // e.g., '300px', '20rem', 280
  itemSpacing?: string | number; // e.g., '1rem', '16px', 16
};

/**
 * A flexible, embeddable carousel component built on Embla Carousel.
 *
 * - When `itemWidth` is provided, each slide is fixed to that width
 *  (using CSS variable `--slide-width`).
 * - When `itemWidth` is omitted, responsive breakpoints in CSS determine
 *  how many slides fit per row.
 * - Supports optional navigation controls, dot indicators, and autoplay.
 *
 * @template T - The type of each item in the `items` array.
 * @param props - Props to control the carousel's data and behavior.
 * @returns A React element representing the carousel. If `items` is empty, returns `null`.
 */
function Carousel<T>({
  items,
  renderItem,
  getItemKey,
  options = {},
  className = '',
  showControls = true,
  showDots = false,
  autoplay = false,
  autoplayDelay = 3000,
  itemWidth,
  itemSpacing = '1rem',
}: CarouselProps<T>) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Convert spacing / width into a valid CSS length string (e.g. "300px", "1rem")
  const slideSpacing = normalizeSize(itemSpacing);
  const slideWidth = itemWidth ? normalizeSize(itemWidth) : undefined;

  // If no itemWidth, sanitizedWidth defaults to 400 (fallback)
  const sanitizedWidth = itemWidth ? extractSize(itemWidth) : 400;

  // Base Embla options
  const emblaOptions: EmblaOptionsType = {
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    ...(options as Partial<EmblaOptionsType>),
  };

  // When no itemWidth is provided, add breakpoints so slidesToScroll adjusts automatically
  if (!itemWidth) {
    emblaOptions.breakpoints = {
      '(min-width: 640px)': { slidesToScroll: Math.floor(640 / sanitizedWidth) },
      '(min-width: 1024px)': { slidesToScroll: Math.floor(1024 / sanitizedWidth) },
      '(min-width: 1280px)': { slidesToScroll: Math.floor(1280 / sanitizedWidth) },
    };
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay logic (scrolls next every autoplayDelay)
  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayInterval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (options.loop) {
        emblaApi.scrollTo(0);
      }
    }, autoplayDelay);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, autoplay, autoplayDelay, options.loop]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  if (!items.length) {
    return null;
  }

  // Build CSS custom properties. We always set --slide-spacing.
  // Only set --slide-width if itemWidth was explicitly provided.
  const cssVariables: CustomCSSProperties = {
    '--slide-spacing': slideSpacing,
  };

  if (itemWidth && slideWidth) {
    // Make sure slideWidth includes a unit like "px" or "rem"
    cssVariables['--slide-width'] = slideWidth;
  }

  return (
    <div
      className={clsx('relative w-full', className, {
        // When itemWidth is undefined → use responsive mode
        'carousel-responsive': !itemWidth,
        // When itemWidth is defined → use fixed-width mode
        'carousel-fixed-width': !!itemWidth,
      })}
      style={cssVariables}
    >
      <div className='overflow-hidden w-full p-2.5' ref={emblaRef}>
        <div className={clsx('flex touch-pan-y touch-pinch-zoom', styles.emblaContainer)}>
          {items.map((item, index) => (
            <div key={getItemKey(item, index)} className={clsx('min-w-0', styles.emblaSlide)}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <div
          className={clsx(
            `flex justify-between items-center absolute top-1/2 left-0 right-0
              pointer-events-none z-10`,
            styles.emblaControls,
          )}
        >
          <button
            className={clsx(styles.emblaBtn, 'ml-4')}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label='Previous slide'
          >
            <Icon variant='react-icon' name='chevron-left' className={styles.emblaBtnIcon} />
          </button>

          <button
            className={clsx(styles.emblaBtn, 'mr-4')}
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label='Next slide'
          >
            <Icon variant='react-icon' name='chevron-right' className={styles.emblaBtnIcon} />
          </button>
        </div>
      )}

      {showDots && (
        <div className='flex justify-center gap-2 mt-4'>
          {items.map((_, index) => (
            <button
              key={index}
              className={clsx(
                `flex items-center justify-center w-8 h-8 border-none bg-transparent
                  cursor-pointer p-0`,
                index === selectedIndex ? styles.emblaDotSelected : '',
              )}
              onClick={() => {
                scrollTo(index);
              }}
              aria-label={`Go to slide ${(index + 1).toString()}`}
            >
              <span
                className={clsx(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  styles.emblaDotInner,
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
