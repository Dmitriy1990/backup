import React, { FC } from "react";
import { usePagination, DOTS } from "hooks/usePagination";
import styles from "./style.module.scss";
import clsx from "clsx";

type Props = {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange: (v: number) => void;
  className?: string;
};

export const Pagination: FC<Props> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles["pagination-container"]}>
      <li
        className={clsx(
          styles[`pagination-item`],
          currentPage === 1 ? styles.disabled : ""
        )}
        onClick={onPrevious}
      >
        <div className={clsx(styles.arrow, styles.left)} />
        <p className={styles.text}>Previos</p>
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                className={clsx(styles["pagination-item"], styles.dots)}
                key={index}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={clsx(
                styles["pagination-item"],
                pageNumber === currentPage ? styles.selected : ""
              )}
              onClick={() => onPageChange(+pageNumber)}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
      <li
        className={clsx(
          styles["pagination-item"],
          currentPage === lastPage ? styles.disabled : ""
        )}
        onClick={onNext}
      >
        <p className={styles.text}>Next</p>
        <div className={clsx(styles.arrow, styles.right)} />
      </li>
    </ul>
  );
};

export default Pagination;
