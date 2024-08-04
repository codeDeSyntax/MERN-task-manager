import PropTypes from "prop-types";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
export const Header = ({ collapsed, toggleSidebar, showUserIcon }) => (
  <header className=" shadow-md p-4 flex justify-between items-center">
    <button
      onClick={toggleSidebar}
      className="text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {collapsed ? <MenuIcon /> : <CloseIcon />}
    </button>
    <h1 className="text-xl font-cursive font-bold text-accent">
      Task Management
    </h1>
    {showUserIcon && <div className="w-8 h-8 bg-gray-300 rounded-full"></div>}
  </header>
);

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  showUserIcon: PropTypes.bool.isRequired,
};
