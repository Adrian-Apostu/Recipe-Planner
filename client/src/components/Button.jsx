import PropTypes from 'prop-types';

function Button({ onClick, children, className = '' }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 mt-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600 ${className}`}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button;