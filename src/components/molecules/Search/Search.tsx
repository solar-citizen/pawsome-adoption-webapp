import clsx from 'clsx'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { IoCloseOutline, PiMagnifyingGlassLight } from '@/src/assets'
import { Button, ButtonTypes, ButtonVariants } from '@/src/components/atoms'
import { SearchExpandTriggerVariants, SearchVariants } from '@/src/components/molecules'

import { getSearchVariantStyles } from './lib'
import styles from './Search.module.css'

type SearchProps = {
  searchValue: string
  placeholder?: string
  altPlaceholder?: string
  className?: string
  variant?: SearchVariants
  expandTriggerVariant?: SearchExpandTriggerVariants
  setSearchValue: (value: string) => void
  onSearchSubmit?: () => void
  onChange?: (value: string) => void
  onClear?: () => void
}

const Search = ({
  searchValue,
  placeholder,
  altPlaceholder,
  className,
  variant,
  expandTriggerVariant,
  setSearchValue,
  onSearchSubmit,
  onChange,
  onClear,
}: SearchProps) => {
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const resetSearchState = useCallback(() => {
    setIsFocused(false)
    inputRef.current?.blur()
  }, [])

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetSearchState()
      }
      if (e.key === 'Space') {
        return
      }
    },
    [resetSearchState],
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSearchSubmit) {
      onSearchSubmit()
      resetSearchState()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    }
    setSearchValue('')
  }

  const expandTriggerHandlers: Partial<Record<SearchExpandTriggerVariants, { [key: string]: () => void }>> = {
    [SearchExpandTriggerVariants.ON_CLICK]: {
      onClick: handleFocus,
    },
    [SearchExpandTriggerVariants.ON_MOUSE_ENTER]: {
      onMouseEnter: handleFocus,
    },
  }

  const triggerHandler = expandTriggerHandlers[expandTriggerVariant ?? SearchExpandTriggerVariants.ON_CLICK]

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const isMatchLargeScreen = useMediaQuery('(min-width: 1024px)')

  const getPlaceholderValue = () => {
    if (!altPlaceholder || !isMatchLargeScreen || isFocused) {
      return placeholder
    }
    return altPlaceholder
  }

  return (
    <div className={clsx(styles.searchContainer, className)}>
      <form className={styles.inputWrapper} onSubmit={handleSubmit}>
        <input
          id='search'
          type='text'
          ref={inputRef}
          value={searchValue}
          className={clsx(styles.searchInput, isFocused ? styles.searchInputFocused : getSearchVariantStyles(variant))}
          placeholder={getPlaceholderValue()}
          onChange={e => {
            const value = e.target.value
            setSearchValue(value)
            if (onChange) onChange(value)
          }}
          {...triggerHandler}
          onBlur={() => {
            if (!searchValue) setIsFocused(false)
          }}
        />

        <Button
          onClick={handleClear}
          variant={ButtonVariants.SIMPLE}
          className={styles.clearButton}
          aria-label='Clear search'
        >
          <IoCloseOutline className={styles.clearIcon} />
        </Button>

        <Button
          onClick={handleFocus}
          className={styles.searchButton}
          variant={ButtonVariants.SIMPLE}
          type={ButtonTypes.SUBMIT}
          aria-label='Search'
        >
          <PiMagnifyingGlassLight className={clsx(styles.searchIcon, { [styles.searchIconFocused]: isFocused })} />
        </Button>
      </form>
    </div>
  )
}

export default Search
