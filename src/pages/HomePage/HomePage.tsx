import { useEffect, useState } from 'react'

import { PetAPI } from '#/api'
import { Pagination, usePagination } from '#/components/molecules'
import { /*HeroBanner,*/ PetCard } from '#/components/organisms'
import { IPet, IPetMeta, IPetResponse } from '#/lib'

import styles from './HomePage.module.css'

const HomePage = () => {
  const [pets, setPets] = useState<IPet[]>([])
  const [meta, setMeta] = useState<IPetMeta>({
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    petsFrom: 0,
    petsTo: 0,
    petsTotal: 0,
  })

  const { currentPage, totalPages, handlePageChange } = usePagination({
    itemsPerPage: meta.perPage,
    totalItems: meta.petsTotal,
    pageParam: 'page',
    limitParam: 'limit',
  })

  useEffect(() => {
    async function fetchPets() {
      const response = await PetAPI.getPets({
        page: currentPage,
        limit: meta.perPage,
      })
      const { data, meta: newMeta }: IPetResponse = response

      setPets(data)
      setMeta(newMeta)
    }

    fetchPets().catch((error: unknown) => {
      console.error('Failed to fetch pets:', error)
    })
  }, [currentPage, meta.perPage])

  return (
    <>
      {/* <HeroBanner /> */}

      <section className={styles.container}>
        <h2 className={styles.title}>Available Pets</h2>

        <div className={styles.petGrid}>
          {pets.map(pet => (
            <PetCard key={pet.lk_pet_code} {...pet} />
          ))}
        </div>

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
  )
}

export default HomePage
