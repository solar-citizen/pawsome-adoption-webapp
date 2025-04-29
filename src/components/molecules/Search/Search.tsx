import clsx from 'clsx'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { Button, ButtonTypes, ButtonVariants } from '#/components/atoms'
import { Icon } from '#/components/molecules'

import { getSearchVariantStyles, type SearchExpandTriggerVariant, type SearchVariant } from './lib'
import styles from './Search.module.css'

type SearchProps = {
  searchValue: string
  placeholder?: string
  altPlaceholder?: string
  className?: string
  variant?: SearchVariant
  expandTriggerVariant?: SearchExpandTriggerVariant
  setSearchValue: (value: string) => void
  onSearchSubmit?: () => void
  onChange?: (value: string) => void
  onClear?: () => void
}

function Search({
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
}: SearchProps) {
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

  const expandTriggerHandlers: Partial<
    Record<SearchExpandTriggerVariant, { [key: string]: () => void }>
  > = {
    'on-click': { onClick: handleFocus },
    'on-mouse-enter': { onMouseEnter: handleFocus },
  }

  const triggerHandler = expandTriggerHandlers[expandTriggerVariant ?? 'on-click']

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
          className={clsx(
            styles.searchInput,
            isFocused ? styles.searchInputFocused : getSearchVariantStyles(variant),
          )}
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
          <Icon variant='react-icon' name='close' className={styles.clearIcon} />
        </Button>

        <Button
          onClick={handleFocus}
          className={styles.searchButton}
          variant={ButtonVariants.SIMPLE}
          type={ButtonTypes.SUBMIT}
          aria-label='Search'
        >
          <Icon
            variant='react-icon'
            name='search'
            className={clsx(styles.searchIcon, { [styles.searchIconFocused]: isFocused })}
          />
        </Button>
      </form>
    </div>
  )
}

export default Search
