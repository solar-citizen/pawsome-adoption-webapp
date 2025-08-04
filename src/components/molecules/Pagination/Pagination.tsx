import clsx from 'clsx';
import { useLocation, useSearchParams } from 'react-router-dom';

import { MasterLink } from '#src/components/atoms';
import { Icon } from '#src/components/molecules';
import { staticTxt /*useScrollToTop*/ } from '#src/lib';

import { getPaginationRange } from './getPaginationRange';
import styles from './Pagination.module.css';

type PaginationProps = {
  pageParam: string;
  totalPages: number;
  currentPage: number;
  displayedPages: number;
  isVisibleOnOnePageCount?: boolean;
  isDetacheableArrows?: boolean;
};

const { ellipsis } = staticTxt;

function Pagination({
  currentPage,
  totalPages,
  displayedPages,
  isVisibleOnOnePageCount = false,
  isDetacheableArrows,
  pageParam,
}: PaginationProps) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const paginationRange = getPaginationRange(currentPage, totalPages, displayedPages);

  function createPageURL(page: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParam, page.toString());
    return `${location.pathname}?${newParams.toString()}`;
  }

  const isPaginationVisible: boolean =
    (totalPages > 1 && !isVisibleOnOnePageCount) || isVisibleOnOnePageCount;

  if (!isPaginationVisible) return null;

  return (
    <nav
      className={clsx(
        styles.paginationContainer,
        isDetacheableArrows ? 'justify-center xl:justify-between' : 'justify-center',
      )}
      aria-label='Pagination'
    >
      <MasterLink
        to={createPageURL(currentPage - 1)}
        type='link'
        className={clsx(
          styles.paginationItem,
          styles.paginationPrevious,
          currentPage === 1 && 'pointer-events-none opacity-50',
        )}
        aria-disabled={currentPage === 1}
        aria-label='Previous page'
      >
        <span className='sr-only'>Previous</span>
        <Icon variant='react-icon' name='chevron-left' className={styles.paginationIcon} />
      </MasterLink>

      <ul className={styles.paginationList}>
        {paginationRange.map((item, idx) => (
          <li key={idx}>
            {typeof item === 'string' ? (
              <MasterLink
                to={createPageURL(
                  idx === 1
                    ? Math.max(currentPage - displayedPages, 1)
                    : Math.min(currentPage + displayedPages, totalPages),
                )}
                type='link'
                className={styles.paginationItem}
                aria-label='Jump by block'
              >
                {ellipsis}
              </MasterLink>
            ) : (
              <MasterLink
                to={createPageURL(item)}
                type='navlink'
                className={clsx(styles.paginationItem, item === currentPage && styles.active)}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </MasterLink>
            )}
          </li>
        ))}
      </ul>

      <MasterLink
        to={createPageURL(currentPage + 1)}
        type='link'
        className={clsx(
          styles.paginationItem,
          styles.paginationNext,
          currentPage === totalPages && 'pointer-events-none opacity-50',
        )}
        aria-disabled={currentPage === totalPages}
        aria-label='Next page'
      >
        <span className='sr-only'>Next</span>
        <Icon variant='react-icon' name='chevron-right' className={styles.paginationIcon} />
      </MasterLink>
    </nav>
  );
}

export default Pagination;
