import { useState } from 'react';

import { heroImg } from '#/assets';
import { Search, useSearch } from '#/components/molecules';

import styles from './HeroBanner.module.css';

function HeroBanner() {
  const [searchValue, setSearchValue] = useState('');

  const { handleChange, handleImmediateSearch, handleClear } = useSearch({
    searchValue,
    setSearchValue,
    searchParam: 'full_text_search',
  });

  return (
    <section className={styles.heroBanner} style={{ backgroundImage: `url(${heroImg})` }}>
      <div className={styles.heroContainer}>
        <h2 className={styles.heading}>Find Your Perfect Companion</h2>
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
