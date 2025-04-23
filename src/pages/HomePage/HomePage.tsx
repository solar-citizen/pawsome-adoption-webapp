import { useEffect, useState } from 'react'

import { PetAPI } from '#/api'
import { HeroBanner, PetCard } from '#/components/organisms'
import { IPet } from '#/lib'

import styles from './HomePage.module.css'

const HomePage = () => {
  const [pets, setPets] = useState<IPet[]>([])

  useEffect(() => {
    async function fetchPets() {
      const data = await PetAPI.getAllPets()
      setPets(data)
    }

    fetchPets().catch((error: unknown) => {
      console.error('Failed to fetch pets:', error)
    })
  }, [])

  return (
    <>
      <HeroBanner />

      <section className={styles.container}>
        <h2 className={styles.title}>Available Pets</h2>

        <div className={styles.petGrid}>
          {pets.map(pet => (
            <PetCard key={pet.lk_pet_code} {...pet} />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
