import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerSet = 5; // Number of pages shown per pagination set
  const currentSet = Math.ceil(currentPage / pagesPerSet); // Current pagination set

  // Function to handle next page click
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); // Increment current page
    }
  };

  // Function to handle previous page click
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); // Decrement current page
    }
  };

  // Function to handle individual page number click
  const handlePageClick = (page) => {
    onPageChange(page); // Go to selected page
  };

  // Function to render page numbers
  const renderPageNumbers = () => {
    const startPage = (currentSet - 1) * pagesPerSet + 1; // Start page of current pagination set
    const endPage = Math.min(startPage + pagesPerSet - 1, totalPages); // End page of current pagination set
    const pageNumbers = [];

    // Loop through pages in current set and create buttons for each
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-orange-400 text-white" // Active page styling
              : "bg-gray-200 text-gray-700" // Inactive page styling
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers; // Return array of page number buttons
  };

  return (
    <div className="flex justify-center items-center space-x-2 font-sans">
      {/* Previous page button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 
        hover:bg-orange-400 disabled:bg-gray-300"
      >
        &larr; {/* Left arrow icon */}
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 
        hover:bg-orange-400 disabled:bg-gray-300"
      >
        &rarr; {/* Right arrow icon */}
      </button>
    </div>
  );
};

// PropTypes validation for Pagination component props
Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
