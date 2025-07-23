import { useSyncPets } from '#src/api';
import { ActiveFilters, Pagination, PetCard, usePagination } from '#src/components/molecules';
import { HeroBanner } from '#src/components/organisms';
import { SearchParams, useResponsiveLazyLoad } from '#src/lib';

import styles from './HomePage.module.css';

const { pagination } = SearchParams.herobanner;

function HomePage() {
  const { pets, meta, isLoading, isError, errorMessage } = useSyncPets();
  const { currentPage, totalPages, handlePageChange } = usePagination({
    itemsPerPage: meta.perPage,
    totalItems: meta.total,
    pageParam: pagination.page,
    limitParam: pagination.limit,
  });
  const lazyThreshold = useResponsiveLazyLoad();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {errorMessage}</p>;

  return (
    <>
      <HeroBanner />

      <section className={styles.container}>
        <h2 className={styles.title}>Available Pets</h2>

        <ActiveFilters />

        {pets.length ? (
          <div className={styles.petGrid}>
            {pets.map((pet, index) => (
              <PetCard key={pet.lk_pet_code} isLazyLoadImg={index > lazyThreshold} {...pet} />
            ))}
          </div>
        ) : (
          <div>No pets available now.</div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          // displayedPages={isMatchMediumScreen ? 5 : 3}
          displayedPages={5}
          isDetacheableArrows
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}

export default HomePage;
