import { useState, useContext } from "react";
import { Popover } from "antd";
import axios from "axios";
import { GlobState } from "./GlobalState";
import PropTypes from "prop-types";
// import { GetUpdatedTasks } from "./GetUpdatedTasks";

axios.defaults.baseURL = "http://localhost:5000";

const NewTask = ({ setLoading }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "low",
    taskID: Date.now().toString(),
  });
  const { setTasks } = useContext(GlobState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
    //   window.location.reload();
      setLoading(true);
      const res = await axios.post("/api/tasks/new", formData);
      setTasks((prevState) => [...prevState, res.data]);
      console.log(res.data);
      setFormOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const content = (
    <div className="w-80 sm:w-96 p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Create a New Task
      </h2>
      <form onSubmit={createTask} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 mb-2 font-medium"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 mb-2 font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 mb-2 font-medium"
            htmlFor="date"
          >
            Due Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 mb-2 font-medium"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Create
          </button>
          <button
            className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-300"
            type="button"
            onClick={() => setFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="topRight"
      open={formOpen}
      onOpenChange={(visible) => setFormOpen(visible)}
    >
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-50"
        onClick={() => setFormOpen(true)}
      >
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </Popover>
  );
};

NewTask.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default NewTask;
