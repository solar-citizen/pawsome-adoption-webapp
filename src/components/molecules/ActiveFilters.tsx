import { startCase } from 'lodash-es';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Badge, useBadgeClickability } from '#src/components/atoms';
import { useSyncURLParams } from '#src/lib';

const BADGE_PARAM_KEYS = ['specie', 'breed', 'sex_txt', 'age_int'] as const;

function ActiveFilters() {
  const [searchParams] = useSearchParams();
  const syncParams = useSyncURLParams({ initialParams: useMemo(() => ({}), []) });
  const { isClickable } = useBadgeClickability();

  const activeFilters = BADGE_PARAM_KEYS.map(key => {
    const val = searchParams.get(key);
    return val ? { key, val } : null;
  }).filter((x): x is { key: (typeof BADGE_PARAM_KEYS)[number]; val: string } => x !== null);

  if (activeFilters.length === 0) {
    return null;
  }

  const handleClearAll = () => {
    const toClear: Record<string, null> = {};
    BADGE_PARAM_KEYS.forEach(k => {
      toClear[k] = null;
    });
    syncParams(toClear);
  };

  return (
    <div className='flex flex-wrap gap-2 m-4'>
      {activeFilters.map(({ key, val }) => (
        <Badge
          key={key}
          variant='random'
          isClickable={isClickable}
          onClick={() => {
            syncParams({ [key]: null });
          }}
        >
          {startCase(key)}: {startCase(val)} ×
        </Badge>
      ))}
      <button
        className='cursor-pointer bg-none border-none p-1.5 text-sm underline'
        onClick={handleClearAll}
      >
        Clear all
      </button>
    </div>
  );
}

export default ActiveFilters;
