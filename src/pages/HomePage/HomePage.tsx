import { useSyncPets } from '#/api';
import { Pagination, usePagination } from '#/components/molecules';
import { HeroBanner, PetCard } from '#/components/organisms';

import styles from './HomePage.module.css';

function HomePage() {
  const { pets, meta, isLoading, isError, error } = useSyncPets();

  const { currentPage, totalPages, handlePageChange } = usePagination({
    itemsPerPage: meta.perPage,
    totalItems: meta.petsTotal,
    pageParam: 'page',
    limitParam: 'limit',
  });

  return (
    <>
      <HeroBanner />

      <section className={styles.container}>
        <h2 className={styles.title}>Available Pets</h2>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error... {error as string}</p>}
        {!isLoading && !isError && (
          <div className={styles.petGrid}>
            {pets.map(pet => (
              <PetCard key={pet.lk_pet_code} {...pet} />
            ))}
          </div>
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
