import { startCase } from 'lodash-es';
import { useMemo, useState } from 'react';

import {
  Badge,
  GlareHover,
  MasterLink,
  ShinyText,
  useBadgeClickability,
} from '#src/components/atoms';
import { type IPet, useAdaptiveThumbnail, useSyncURLParams } from '#src/lib';

import styles from './PetCard.module.css';

type PetCardProps = Pick<
  IPet,
  'lk_pet_code' | 'name' | 'specie' | 'breed' | 'sex_txt' | 'age_int' | 'thumbnails'
> & {
  isLazyLoadImg: boolean;
};

function PetCard(props: PetCardProps) {
  const [isHovered, setHovered] = useState(false);

  const { lk_pet_code, name, specie, breed, sex_txt, age_int, thumbnails, isLazyLoadImg } = props;
  const imageUrl = useAdaptiveThumbnail(thumbnails);
  const { isClickable } = useBadgeClickability();

  const syncParams = useSyncURLParams({
    initialParams: useMemo(() => ({}), []),
  });

  const handleParamUpdate = (paramKey: string, value: string | null) => {
    syncParams({ [paramKey]: value });
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <MasterLink type='link' to={`/pets/${lk_pet_code}`}>
        <GlareHover className='rounded-t-md'>
          <img
            src={imageUrl}
            alt={startCase(name)}
            className='w-full aspect-video object-cover rounded-t-md'
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
