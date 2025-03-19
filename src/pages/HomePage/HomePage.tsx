import { HeroBanner, PetCard } from '@/src/components/organisms'

import styles from './HomePage.module.css'

const samplePets = [
  { name: 'Buddy', breed: 'Golden Retriever', image: '/assets/pet1.jpg' },
  { name: 'Milo', breed: 'Tabby Cat', image: '/assets/pet2.jpg' },
  { name: 'Bella', breed: 'Labrador', image: '/assets/pet3.jpg' },
]

const HomePage = () => {
  return (
    <>
      <HeroBanner />

      <section className={styles.container}>
        <h2 className={styles.title}>Available Pets</h2>

        <div className={styles.petGrid}>
          {samplePets.map((pet, index) => (
            <PetCard key={index} {...pet} />
          ))}
        </div>
      </section>
    </>
  )
}

export default HomePage
