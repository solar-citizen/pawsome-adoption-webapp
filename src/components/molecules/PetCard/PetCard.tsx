import { startCase } from 'lodash-es';
import { useState } from 'react';

import {
  Badge,
  GlareHover,
  MasterLink,
  ShinyText,
  useBadgeClickability,
} from '#src/components/atoms';
import { Image } from '#src/components/molecules';
import { type IPet, useAdaptiveThumbnail } from '#src/lib';

import styles from './PetCard.module.css';

type PetCardProps = Pick<
  IPet,
  'lk_pet_code' | 'name' | 'specie' | 'breed' | 'sex_txt' | 'age_int' | 'thumbnails'
> & {
  isLazyLoadImg: boolean;
  onParamUpdate?: (paramKey: string, value: string | null) => void;
};

function PetCard(props: PetCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    lk_pet_code,
    name,
    specie,
    breed,
    sex_txt,
    age_int,
    thumbnails,
    isLazyLoadImg,
    onParamUpdate,
  } = props;

  const imageUrl = useAdaptiveThumbnail(thumbnails);
  const { isClickable } = useBadgeClickability();

  const handleParamUpdate = (paramKey: string, value: string | null) => {
    onParamUpdate?.(paramKey, value);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <MasterLink type='link' to={`/pets/${lk_pet_code}`}>
        <GlareHover className='rounded-t-md'>
          <Image
            aspectRatio='aspect-video'
            src={imageUrl}
            alt={startCase(name)}
            className='w-full object-cover rounded-t-md'
            loading={isLazyLoadImg ? 'lazy' : 'eager'}
          />
        </GlareHover>
      </MasterLink>
      <div className='p-4'>
        <h3>
          <ShinyText active={isHovered} duration={3} className='text-xl font-bold mt-2'>
            {startCase(name)}
          </ShinyText>
        </h3>
        <div className='flex flex-wrap gap-2 mt-3'>
          <Badge
            variant='primary'
            isClickable={isClickable}
            onParamUpdate={handleParamUpdate}
            paramKey='specie'
            paramValue={specie}
          >
            {startCase(specie)}
          </Badge>

          <Badge
            variant='outline'
            isClickable={isClickable}
            onParamUpdate={handleParamUpdate}
            paramKey='breed'
            paramValue={breed}
          >
            {startCase(breed)}
          </Badge>

          <Badge
            variant='outline'
            isClickable={isClickable}
            onParamUpdate={handleParamUpdate}
            paramKey='sex_txt'
            paramValue={sex_txt}
          >
            {startCase(sex_txt)}
          </Badge>

          {age_int && (
            <Badge
              variant='outline'
              isClickable={isClickable}
              onParamUpdate={handleParamUpdate}
              paramKey='age_int'
              paramValue={age_int}
            >
              Age: {age_int}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetCard;
