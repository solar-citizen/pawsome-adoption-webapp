import { useAutoAnimate } from '@formkit/auto-animate/react';
import { startCase } from 'lodash-es';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Badge, Button, ButtonVariants, useBadgeClickability } from '#src/components/atoms';
import { humanizeParam, useSyncURLParams } from '#src/lib';

import styles from './ActiveFilters.module.css';

const BADGE_PARAM_KEYS = ['specie', 'breed', 'sex_txt', 'age_int'] as const;

function ActiveFilters() {
  const [searchParams] = useSearchParams();
  const syncParams = useSyncURLParams({ initialParams: useMemo(() => ({}), []) });
  const { isClickable } = useBadgeClickability();

  const activeFilters = BADGE_PARAM_KEYS.map(key => {
    const val = searchParams.get(key);
    return val ? { key, val } : null;
  }).filter((x): x is { key: (typeof BADGE_PARAM_KEYS)[number]; val: string } => x !== null);

  const [wrapperRef] = useAutoAnimate<HTMLDivElement>({
    duration: 300,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  });

  const handleClearAll = () => {
    const toClear: Record<string, null> = {};
    BADGE_PARAM_KEYS.forEach(k => (toClear[k] = null));
    syncParams(toClear);
  };

  return (
    <div ref={wrapperRef} className={styles.activeFiltersWrapper}>
      {activeFilters.map(({ key, val }) => (
        <Badge
          key={key}
          variant='random'
          isClickable={isClickable}
          onClick={() => {
            syncParams({ [key]: null });
          }}
        >
          {humanizeParam(key)}: {startCase(val)} ×
        </Badge>
      ))}

      {activeFilters.length > 0 && (
        <Button
          variant={ButtonVariants.SIMPLE}
          className={styles.clearAllBtn}
          onClick={handleClearAll}
        >
          Clear all
        </Button>
      )}
    </div>
  );
}

export default ActiveFilters;
