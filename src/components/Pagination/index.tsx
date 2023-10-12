import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export const Pagination = ({ onChangePage }: { onChangePage: any }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};
