import styles from './PetCard.module.css'

type PetCardProps = {
  name: string
  breed: string
  // image: string
}

const PetCard = ({ name, breed /*, image*/ }: PetCardProps) => (
  <div className={styles.wrapper}>
    {/*<img src={image} alt={name} className={styles.petImg} />*/}

    <div className={styles.petDetails}>
      <h3 className={styles.petName}>{name}</h3>
      <p className={styles.petBreed}>{breed}</p>
    </div>
  </div>
)

export default PetCard
