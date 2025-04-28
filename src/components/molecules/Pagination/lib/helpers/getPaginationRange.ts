import { staticTxt } from '#/lib'

const { ellipsis } = staticTxt

/**
 * Generates an array representing the pagination range to be displayed.
 *
 * This function creates a page number array that includes the first and last page numbers,
 * along with a subset of page numbers around the current page. When there are gaps in the
 * sequence, ellipsis strings are inserted. The algorithm ensures that the current page
 * is always visible and centered when possible within the displayed range.
 *
 * @param {number} currentPage - Currently active page number
 * @param {number} totalPages - Total number of pages available
 * @param {number} displayedPages - Maximum number of page numbers to display (exc first/last page)
 * @returns {(number | string)[]} An array containing page numbers and ellipsis strings
 *   representing the pagination structure. For example: [1, '...', 4, 5, 6, '...', 10]
 *
 * @example
 * // Returns [1, 2, 3, 4, 5] for a simple 5-page pagination
 * getPaginationRange(3, 5, 5);
 *
 * @example
 * // Returns [1, '...', 8, 9, 10, 11, 12, '...', 20] for a large pagination
 * getPaginationRange(10, 20, 5);
 */
export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  displayedPages: number,
): (number | string)[] => {
  const totalPageNumbers = displayedPages + 2

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const range: (number | string)[] = []

  range.push(1)

  const halfDisplayedCount = Math.floor(displayedPages / 2)
  let leftSiblingIndex = Math.max(currentPage - halfDisplayedCount, 2)
  let rightSiblingIndex = Math.min(currentPage + halfDisplayedCount, totalPages - 1)

  const siblingsCount = rightSiblingIndex - leftSiblingIndex + 1

  if (currentPage <= halfDisplayedCount) {
    rightSiblingIndex = displayedPages
    leftSiblingIndex = 2
  } else if (totalPages - currentPage < halfDisplayedCount) {
    leftSiblingIndex = totalPages - displayedPages + 1
    rightSiblingIndex = totalPages - 1
  } else if (siblingsCount > displayedPages) {
    rightSiblingIndex = leftSiblingIndex + displayedPages - 1
  }

  if (leftSiblingIndex > 2) {
    range.push(ellipsis)
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i)
  }

  if (rightSiblingIndex < totalPages - 1) {
    range.push(ellipsis)
  }

  range.push(totalPages)

  return range
}
