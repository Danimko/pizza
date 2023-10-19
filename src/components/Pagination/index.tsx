import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export interface PaginationModel {
  currentPage: number;
  onChangePage: any;
}

export const Pagination = ({ currentPage, onChangePage }: PaginationModel) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};
