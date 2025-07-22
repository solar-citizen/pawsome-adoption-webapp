import clsx from 'clsx';
import { useMemo } from 'react';

import { PetCard } from '#src/components/molecules';
import { Carousel } from '#src/components/organisms';
import type { IPet } from '#src/lib';

type SimilarPetsProps = {
  pets: IPet[] | undefined;
  title?: string;
  isLoading?: boolean;
  className?: string;
  carouselWrapperCls?: string;
};

function SimilarPets({
  pets = [],
  title,
  isLoading = false,
  className = '',
  carouselWrapperCls = '',
}: SimilarPetsProps) {
  const carouselOptions = useMemo(
    () => ({
      loop: false,
      align: 'start' as const,
      slidesToScroll: 1,
      containScroll: 'trimSnaps' as const,
      dragFree: true,
    }),
    [],
  );

  if (!pets.length) {
    return null;
  }

  return (
    <div className={clsx('mt-8', className)}>
      <h2 className='text-start text-2xl font-semibold'>{title}</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          items={pets}
          renderItem={(pet: IPet, index: number) => <PetCard {...pet} isLazyLoadImg={index > 1} />}
          getItemKey={(pet: IPet) => pet.lk_pet_code}
          options={carouselOptions}
          className={clsx('mt-2', carouselWrapperCls)}
          itemWidth={300}
        />
      )}
    </div>
  );
}

export default SimilarPets;
