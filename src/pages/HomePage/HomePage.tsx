import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useMemo } from 'react';

import { useSyncPets } from '#src/api';
import { ActiveFilters, Pagination, PetCard, usePagination } from '#src/components/molecules';
import { HeroBanner } from '#src/components/organisms';
import { SearchParams, useResponsiveLazyLoad, useSyncURLParams } from '#src/lib';

import styles from './HomePage.module.css';

const { pagination } = SearchParams.herobanner;

function HomePage() {
  const { pets, meta, isLoading, isError, errorMessage } = useSyncPets();
  const { currentPage, totalPages } = usePagination({
    itemsPerPage: meta.perPage,
    totalItems: meta.total,
    pageParam: pagination.page,
    limitParam: pagination.limit,
  });
  const lazyThreshold = useResponsiveLazyLoad();

  const [gridRef] = useAutoAnimate<HTMLDivElement>({
    duration: 300,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  });

  const syncParams = useSyncURLParams({
    initialParams: useMemo(() => ({}), []),
  });

  const handleParamUpdate = (paramKey: string, value: string | null) => {
    syncParams({ [paramKey]: value });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {errorMessage}</p>;

  return (
    <>
      <HeroBanner />

      <section className={styles.container}>
        <h2 className={styles.title}>Available Pets</h2>

        <ActiveFilters />

        {pets.length > 0 ? (
          <div ref={gridRef} className={styles.petGrid}>
            {pets.map((pet, index) => (
              <PetCard
                onParamUpdate={handleParamUpdate}
                key={pet.lk_pet_code}
                isLazyLoadImg={index > lazyThreshold}
                {...pet}
              />
            ))}
          </div>
        ) : (
          <div>No pets available now.</div>
        )}

        <Pagination
          pageParam='page'
          currentPage={currentPage}
          totalPages={totalPages}
          displayedPages={5}
          isDetacheableArrows
        />
      </section>
    </>
  );
}

export default HomePage;
