import clsx from 'clsx';

import { Button, ButtonVariants } from '#src/components/atoms';
import { Icon } from '#src/components/molecules';
import { staticTxt, useScrollToTop } from '#src/lib';

import { getPaginationRange } from './getPaginationRange';
import styles from './Pagination.module.css';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  displayedPages: number;
  isVisibleOnOnePageCount?: boolean;
  isDetacheableArrows?: boolean;
  onPageChange: (pageNumber: number) => void;
};

const { ellipsis } = staticTxt;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  displayedPages,
  isVisibleOnOnePageCount,
  isDetacheableArrows,
}: PaginationProps) {
  const scrollToTop = useScrollToTop();
  const paginationRange = getPaginationRange(currentPage, totalPages, displayedPages);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      scrollToTop();
    }
  };

  const isPaginationVisible: boolean = totalPages > 1 && !isVisibleOnOnePageCount;

  return (
    isPaginationVisible && (
      <nav
        className={clsx(
          styles.paginationContainer,
          isDetacheableArrows ? 'justify-center xl:justify-between' : 'justify-center',
        )}
      >
        <Button
          variant={ButtonVariants.SIMPLE}
          className={clsx(styles.paginationItem, styles.paginationPrevious)}
          isDisabled={currentPage === 1}
          onClick={() => {
            handlePageChange(currentPage - 1);
          }}
        >
          <span className='sr-only'>Previous</span>
          <Icon variant='react-icon' name='chevron-left' className={styles.paginationIcon} />
        </Button>

        <ul className={styles.paginationList}>
          {paginationRange.map((paginationItem, index) => (
            <li key={index}>
              {typeof paginationItem === 'string' ? (
                <Button
                  variant={ButtonVariants.SIMPLE}
                  onClick={() => {
                    if (paginationItem === ellipsis) {
                      const isLeftEllipsis = index === 1;
                      const isRightEllipsis = index === paginationRange.length - 2;

                      if (isLeftEllipsis) {
                        const previousPageBlock = Math.max(currentPage - displayedPages, 1);
                        handlePageChange(previousPageBlock);
                      } else if (isRightEllipsis) {
                        const nextPageBlock = Math.min(currentPage + displayedPages, totalPages);
                        handlePageChange(nextPageBlock);
                      }
                    }
                  }}
                  className={styles.paginationItem}
                >
                  {ellipsis}
                </Button>
              ) : (
                <Button
                  variant={ButtonVariants.SIMPLE}
                  onClick={() => {
                    handlePageChange(paginationItem);
                  }}
                  className={clsx(
                    styles.paginationItem,
                    paginationItem === currentPage ? styles.active : '',
                  )}
                >
                  {paginationItem}
                </Button>
              )}
            </li>
          ))}
        </ul>

        <Button
          variant={ButtonVariants.SIMPLE}
          className={clsx(styles.paginationItem, styles.paginationNext)}
          isDisabled={currentPage === totalPages}
          onClick={() => {
            handlePageChange(currentPage + 1);
          }}
        >
          <span className='sr-only'>Next</span>
          <Icon variant='react-icon' name='chevron-right' className={styles.paginationIcon} />
        </Button>
      </nav>
    )
  );
}

export default Pagination;
