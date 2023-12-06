import React, { memo, useCallback } from "react";
import "./style.css";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { cn as bem } from "@bem-react/classname";

const Pagination = (props) => {
  const cn = bem("Pagination");

  const store = useStore();

  const select = useSelector((state) => ({
    currentPage: state.catalog.currentPage,
  }));

  const callbacks = {
    // Установка текущей страницы
    setPage: useCallback(
      (page) => store.actions.catalog.setCurrentPage(page),
      [store]
    ),
  };

  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
  const visiblePages = 1;

  // Собираем все номера страниц
  const getAllPages = () => {
    let firstPage = Math.max(1, select.currentPage - visiblePages);
    let lastPage = Math.min(totalPages, select.currentPage + visiblePages);

    const pages = [];

    if (select.currentPage - visiblePages > 1) {
      pages.push(1);
      if (select.currentPage - visiblePages > 2) {
        pages.push("...");
      }
    }

    for (let i = firstPage; i <= lastPage; i++) {
      pages.push(i);
    }

    if (select.currentPage + visiblePages < totalPages) {
      if (select.currentPage + visiblePages < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "...") {
      callbacks.setPage(page);
    }
  };

  return (
    <div className={cn()}>
      {getAllPages().map((page, index) => (
        <button
          className={
            page === select.currentPage
              ? cn("page", { is: "active" })
              : cn("page")
          }
          style={page === "..." ? { color: "#CCC" } : {}}
          key={index}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default memo(Pagination);
