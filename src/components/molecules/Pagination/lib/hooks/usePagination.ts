import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useSyncURLParams } from '#/lib'

type UsePaginationProps = {
  itemsPerPage: number
  totalItems: number
  pageParam: string
  limitParam: string
}

/**
 * Reads `page` and `limit` (or custom param keys) from the URL, calculates current page
 * and total pages based on provided `itemsPerPage` and `totalItems`, and updates the URL.
 *
 * @param props
 *    Pagination configuration
 * @param props.pageParam
 *    Query param key for page number
 * @param props.limitParam
 *    Query param key for `itemsPerPage`
 * @param props.itemsPerPage
 *    Number of items displayed per page
 * @param props.totalItems
 *    Total number of items available
 * @returns
 *    An object containing:
 *    - currentPage: The current page number from the URL (defaults to 1)
 *    - totalPages: The total number of pages calculated from totalItems/itemsPerPage
 *    - handlePageChange: Function to navigate to a given page (updates URL param)
 */
export const usePagination = ({
  itemsPerPage,
  totalItems,
  pageParam,
  limitParam,
}: UsePaginationProps) => {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get(pageParam)) || 1
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const initialQuery = useMemo(
    () => ({
      [limitParam]: itemsPerPage.toString(),
      [pageParam]: currentPage.toString(),
    }),
    [limitParam, itemsPerPage, pageParam, currentPage],
  )

  const syncParams = useSyncURLParams(initialQuery, true)

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      syncParams({ [pageParam]: pageNumber.toString() })
    }
  }

  return { currentPage, totalPages, handlePageChange }
}
