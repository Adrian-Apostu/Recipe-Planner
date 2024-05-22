import PropTypes from 'prop-types';

function Pagination({ page, setPage, totalPages }) {
    return (
        <div className="mt-4 flex justify-between">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
            >
                Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
            >
                Next
            </button>
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default Pagination;