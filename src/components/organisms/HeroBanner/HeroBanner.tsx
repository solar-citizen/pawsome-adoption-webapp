import { useState } from 'react'

import { heroImg } from '@/src/assets'
import {
  Search,
  SearchExpandTriggerVariants,
  SearchVariants,
  useSearch,
} from '@/src/components/molecules'

import styles from './HeroBanner.module.css'

const HeroBanner = () => {
  const [searchValue, setSearchValue] = useState('')

  const { handleChange, handleImmediateSearch, handleClear } = useSearch({
    searchValue,
    setSearchValue,
    searchParam: 'full_text_search',
  })

  return (
    <section className={styles.heroBanner} style={{ backgroundImage: `url(${heroImg})` }}>
      <div className={styles.heroContainer}>
        <h2 className={styles.heading}>Find Your Perfect Companion</h2>
        <p className={styles.subheading}>Explore thousands of pets waiting for a loving home.</p>

        <Search
          variant={SearchVariants.COLLAPSED}
          expandTriggerVariant={SearchExpandTriggerVariants.ON_CLICK}
          placeholder='Search pets...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchSubmit={handleImmediateSearch}
          onChange={handleChange}
          onClear={handleClear}
        />
      </div>
    </section>
  )
}

export default HeroBanner
