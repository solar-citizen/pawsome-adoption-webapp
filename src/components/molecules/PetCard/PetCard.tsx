import { type IPet, useAdaptiveThumbnail } from '#src/lib';

import styles from './PetCard.module.css';

type PetCardProps = Pick<IPet, 'name' | 'specie' | 'breed' | 'sex_txt' | 'age_int' | 'thumbnails'>;

function PetCard({ name, specie, breed, sex_txt, age_int, thumbnails }: PetCardProps) {
  const thumbnailSrc = useAdaptiveThumbnail(thumbnails);
  return (
    <div className={styles.wrapper}>
      <div className={styles.petDetails}>
        <h3 className={styles.petName}>{name}</h3>
        <img src={thumbnailSrc} alt={name} />

        <p className={styles.petBreed}>{specie}</p>
        <p className={styles.petBreed}>{breed}</p>
        <p className={styles.petBreed}>{sex_txt}</p>
        <p className={styles.petBreed}>{age_int}</p>
      </div>
    </div>
  );
}

export default PetCard;
