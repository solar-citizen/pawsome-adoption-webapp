import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

type UseSearchProps = {
  searchValue: string
  setSearchValue: (value: string) => void
  searchParam?: string
  onSearch?: (value: string) => void
}

export const useSearch = ({
  searchValue,
  setSearchValue,
  searchParam,
  onSearch,
}: UseSearchProps) => {
  const [, setSearchParams] = useSearchParams()

  const updateSearchParam = useCallback(
    (value: string) => {
      if (searchParam) {
        setSearchParams(prev => {
          const newParams = new URLSearchParams(prev)
          newParams.set(searchParam, value.trim())
          return newParams
        })
      }
    },
    [searchParam, setSearchParams],
  )

  const performSearch = useCallback(
    (value: string) => {
      const trimmedValue = value.trim()

      if (trimmedValue) {
        updateSearchParam(trimmedValue)

        if (onSearch) {
          onSearch(trimmedValue)
        }
      }
    },
    [updateSearchParam, onSearch],
  )

  const debouncedSearch = useDebouncedCallback(performSearch, 2000)

  const handleImmediateSearch = useCallback(() => {
    debouncedSearch.cancel()
    performSearch(searchValue)
  }, [searchValue, performSearch, debouncedSearch])

  const handleChange = useCallback(
    (value: string) => {
      setSearchValue(value)
      debouncedSearch(value)
    },
    [setSearchValue, debouncedSearch],
  )

  const handleClear = useCallback(() => {
    if (searchParam) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev)
        newParams.delete(searchParam)
        return newParams
      })
    }
    setSearchValue('')
  }, [searchParam, setSearchParams, setSearchValue])

  return {
    handleChange,
    handleImmediateSearch,
    handleClear,
  }
}
