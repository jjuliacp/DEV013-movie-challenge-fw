import "../styles/Pagination.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

interface PaginationProps {
  currentPage: number; // representa la pagina activa actual
  totalPages: number; // representa el recuento total de paginas
  onSelectPage: (page: number) => void;
}
function Pagination({
  currentPage,
  totalPages,
  onSelectPage,
}: PaginationProps) {
  const pageRange = 1;
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Agregar puntos suspensivos si no están en el rango visible
  if (startPage > 2) {
    pageNumbers.unshift(1, "...");
  } else if (startPage === 2) {
    pageNumbers.unshift(1);
  }

  if (endPage < totalPages - 1) {
    pageNumbers.push("...", totalPages);
  } else if (endPage === totalPages - 1) {
    pageNumbers.push(totalPages);
  }
  const onPreviousPage = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace
    if (currentPage > 1) {
      onSelectPage(currentPage - 1);
    }
  };

  const onNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onSelectPage(currentPage + 1);
    }
  };

  const onSpecificPage = (page: number, e: React.MouseEvent) => {
    // console.log("Specific Page clicked:", page);
    e.preventDefault();
    if (page !== currentPage) {
      onSelectPage(page);
    }
  };

  return (
    <nav className="containerPagination">
      <a
        data-testid="btn-previous"
        className={`btnPrevious ${currentPage === 1 ? "is-Disable" : ""}`}
        href="#"
        onClick={onPreviousPage}
      >
        <IoMdArrowDropleft />
      </a>
      <ul className="paginationList">
        {pageNumbers.map((noPage, index) => (
          <li key={index}>
            {typeof noPage === "number" ? (
              <a
                className={`btnNumbers ${
                  noPage === currentPage ? "is-current" : ""
                }`}
                href="#"
                onClick={(e) => onSpecificPage(noPage, e)}
              >
                {noPage}
              </a>
            ) : (
              <span data-testid="btn-dots" className="dots">
                &#8230;
              </span>
            )}
          </li>
        ))}
      </ul>
      <a
        data-testid="btn-next"
        className={`btnNext ${
          currentPage === pageNumbers.length ? "is-Disable" : ""
        }`}
        href="#"
        onClick={onNextPage}
      >
        <IoMdArrowDropright />
      </a>
    </nav>
  );
}
export default Pagination;
