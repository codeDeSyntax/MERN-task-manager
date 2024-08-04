import PropTypes from "prop-types";

export const Sidebar = ({ collapsed, menuItems, onSignOut }) => {
  return (
    <div
      className={` text-white  h-screen shadow-md shadow-primary flex flex-col items-center ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 flex items-center justify-center ">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        {!collapsed && <span className="ml-2">Martino Martini</span>}
      </div>
      <nav className="flex justify-center items-center flex-col gap-4">
        {menuItems.map((item) => (
          <div
            className="border-0 hover:border hover:border-secondary transition-all duration-300 ease-in-out rounded-lg"
            key={item.key}
          >
            <a href="#" className="flex items-center px-4 py-2 ">
              {item.icon}
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </a>
          </div>
        ))}
      </nav>
      <button
        onClick={onSignOut}
        className="absolute bottom-4  bg-secondary text-white px-4 py-2 rounded hover:bg-red-600 "
      >
        {collapsed ? "Out" : "Sign Out"}
      </button>
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSignOut: PropTypes.func.isRequired,
};
