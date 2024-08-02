import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Icons (you might want to use a library like react-icons instead)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

// TaskCard Component
const TaskCard = ({ task }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs ${
          task.priority === 'high' ? 'bg-red-500 text-white' :
          task.priority === 'medium' ? 'bg-yellow-500 text-black' :
          'bg-green-500 text-white'
        }`}>
          {task.priority}
        </span>
        <span className="text-gray-500 text-xs">{task.date}</span>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full"><EditIcon /></button>
        <button className="p-2 hover:bg-gray-100 rounded-full"><DeleteIcon /></button>
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreIcon />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  // Handle mark as complete
                  setShowDropdown(false);
                }}
              >
                Mark as complete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
  }).isRequired,
};

// Sidebar Component
const Sidebar = ({ collapsed, menuItems, onSignOut }) => (
  <div className={`bg-gray-800 text-white h-full ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out`}>
    <div className="p-4 flex items-center justify-center">
      <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
      {!collapsed && <span className="ml-2">Martino Martini</span>}
    </div>
    <nav className="mt-8">
      {menuItems.map((item) => (
        <a
          key={item.key}
          href="#"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
        >
          {item.icon}
          {!collapsed && <span className="ml-2">{item.label}</span>}
        </a>
      ))}
    </nav>
    <button
      onClick={onSignOut}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      {collapsed ? 'Out' : 'Sign Out'}
    </button>
  </div>
);

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onSignOut: PropTypes.func.isRequired,
};

// Header Component
const AppHeader = ({ collapsed, toggleSidebar, showUserIcon }) => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <button
      onClick={toggleSidebar}
      className="text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {collapsed ? <MenuIcon /> : <CloseIcon />}
    </button>
    <h1 className="text-xl font-semibold">Task Management</h1>
    {showUserIcon && (
      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    )}
  </header>
);

AppHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  showUserIcon: PropTypes.bool.isRequired,
};

// Tabs Component
const Tabs = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex border-b mb-4">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        className={`px-4 py-2 font-medium ${
          activeTab === tab.key
            ? 'border-b-2 border-blue-500 text-blue-500'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => setActiveTab(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

// Main App Component
const TaskManagementApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      setCollapsed(isMobile);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const menuItems = [
    { key: '1', icon: '✅', label: 'All Tasks' },
    { key: '2', icon: '⏳', label: 'In Progress' },
    { key: '3', icon: '❗', label: 'Important' },
  ];

  const tabs = [
    { key: '1', label: 'All Tasks' },
    { key: '2', label: 'In Progress' },
    { key: '3', label: 'Important' },
  ];

  const tasks = [
    { id: 1, title: 'Update Passwords', description: 'Enhance online security across accounts', date: '14/10/2023', priority: 'high' },
    { id: 2, title: 'Watch Fireship Video', description: 'Learn new web development techniques', date: '15/11/2023', priority: 'medium' },
    { id: 3, title: 'Weekly Review', description: 'Assess progress and plan ahead', date: '27/08/2023', priority: 'low' },
    { id: 4, title: 'Dentist Appointment', description: 'Regular check-up and cleaning', date: '25/10/2023', priority: 'medium' },
    { id: 5, title: 'Plant New Flowers', description: 'Beautify the garden for spring', date: '25/10/2023', priority: 'low' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {!mobileView && <Sidebar collapsed={collapsed} menuItems={menuItems} onSignOut={() => console.log('Sign out')} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader collapsed={collapsed} toggleSidebar={toggleSidebar} showUserIcon={mobileView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === '1' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
            {activeTab === '2' && <p>In Progress tasks will be displayed here.</p>}
            {activeTab === '3' && <p>Important tasks will be displayed here.</p>}
          </div>
        </main>
      </div>
      <button 
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default TaskManagementApp;