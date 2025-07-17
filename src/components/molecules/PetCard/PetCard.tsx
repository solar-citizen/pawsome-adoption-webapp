import { Badge, MasterLink } from '#src/components/atoms';
import { type IPet, useAdaptiveThumbnail } from '#src/lib';

import styles from './PetCard.module.css';

type PetCardProps = Pick<
  IPet,
  'lk_pet_code' | 'name' | 'specie' | 'breed' | 'sex_txt' | 'age_int' | 'thumbnails'
>;

function PetCard(props: PetCardProps) {
  const { lk_pet_code, name, specie, breed, sex_txt, age_int, thumbnails } = props;
  const imageUrl = useAdaptiveThumbnail(thumbnails);

  return (
    <div className={styles.wrapper}>
      <MasterLink type='link' to={`/pets/${lk_pet_code}`}>
        <img src={imageUrl} alt={name} className='w-full h-64 object-cover rounded-t-md' />
      </MasterLink>

      <div className='p-4'>
        <h3 className='text-xl font-bold mt-2 text-gray-800'>{name}</h3>

        <div className='flex flex-wrap gap-2 mt-3'>
          <Badge variant='primary'>{specie}</Badge>
          <Badge variant='outline'>{breed}</Badge>
          <Badge variant='outline'>{sex_txt}</Badge>
          <Badge variant='outline'>{age_int}</Badge>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
