import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Pagination = (props) => {
  const cn = bem("Pagination");

  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
  const visiblePages = 1;

  // Собираем все номера страниц
  const getAllPages = () => {
    let firstPage = Math.max(1, props.currentPage - visiblePages);
    let lastPage = Math.min(totalPages, props.currentPage + visiblePages);

    const pages = [];

    if (props.currentPage - visiblePages > 1) {
      pages.push(1);
      if (props.currentPage - visiblePages > 2) {
        pages.push("...");
      }
    }

    for (let i = firstPage; i <= lastPage; i++) {
      pages.push(i);
    }

    if (props.currentPage + visiblePages < totalPages) {
      if (props.currentPage + visiblePages < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "...") {
      props.setCurrentPage(page);
    }
  };

  return (
    <div className={cn()}>
      {getAllPages().map((page, index) => (
        <button
          className={
            page === props.currentPage
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

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

Pagination.defaultTypes = {
  setCurrentPage: () => {},
};

export default memo(Pagination);
