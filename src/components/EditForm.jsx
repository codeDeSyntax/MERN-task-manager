import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const EditForm = ({ task, setIsEditing, }) => {
  const [formData, setFormData] = React.useState({
    title: task.title,
    description: task.description,
    date: task.date,
    priority: task.priority,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/tasks/edit/${task._id}`, formData);
      console.log(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-screen flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form  className="space-y-4">
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
          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              type="submit"
              onClick={editTask}
            >
              Update
            </button>
            <button
              className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-300"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["high", "medium", "low"]).isRequired,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
};
