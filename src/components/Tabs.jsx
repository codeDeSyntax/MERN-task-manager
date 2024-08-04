import PropTypes from 'prop-types';
export const Tabs = ({ tabs, activeTab, setActiveTab }) => (
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