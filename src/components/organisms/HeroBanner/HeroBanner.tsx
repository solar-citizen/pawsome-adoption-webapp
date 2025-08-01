import { useState } from 'react';

import { Search, useSearch, useSearchParamSync } from '#src/components/molecules';
import { SearchParams } from '#src/lib';

import styles from './HeroBanner.module.css';

const { fullTextSearch } = SearchParams.herobanner;

function HeroBanner() {
  const [searchValue, setSearchValue] = useState('');

  const { handleChange, handleImmediateSearch, handleClear } = useSearch({
    searchValue,
    setSearchValue,
    searchParam: fullTextSearch,
  });

  useSearchParamSync({ searchParam: fullTextSearch, setSearchValue });

  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heading}>Find Your Perfect Companion</h1>
        <p className={styles.subheading}>Explore thousands of pets waiting for a loving home.</p>

        <Search
          variant='collapsed'
          expandTriggerVariant='on-click'
          placeholder='Search pets...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchSubmit={handleImmediateSearch}
          onChange={handleChange}
          onClear={handleClear}
        />
      </div>
    </section>
  );
}

export default HeroBanner;
