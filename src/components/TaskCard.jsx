import PropTypes from "prop-types";
import { useState } from "react";
import { EditForm } from "./EditForm";
import axios from "axios";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-primary hover:text-secondary"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-primary hover:text-secondary"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-primary hover:text-secondary"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

export const TaskCard = ({ task }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const deleteTask = async (e) => {
    e.preventDefault();
    try {
        console.log(`Deleting task with ID: ${task._id}`);
        const response = await axios.delete(`/api/tasks/delete/${task._id}`);
        console.log(response.data);
        window.location.reload();
    } catch (error) {
        console.error("Error deleting task", error);
        console.error("Error response:", error.response);
    }
  }

  return (
    <div className="relative rounded-lg  bg-[#f9f8f1] shadow border shadow-secondar p-4 mb-4 flex flex-col" style={{ minHeight: "150px" }}>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-background">{task.title}</h3>
        <p className="text-sm text-background mb-4">{task.description}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              task.priority === "high"
                ? "bg-red-500 text-white"
                : task.priority === "medium"
                ? "bg-yellow-500 text-black"
                : "bg-green-500 text-white"
            }`}
          >
            {task.priority}
          </span>
          <span className="text-[gray] text-xs">{task.date}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button className="p-2 hover:bg-text rounded-full" onClick={() => setIsEditing(true)}>
          <EditIcon />
        </button>
        <button className="p-2 hover:bg-text rounded-full" onClick={deleteTask}>
          <DeleteIcon />
        </button>
        <div className="relative">
          <button
            className="p-2 hover:bg-text rounded-full"
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
      {isEditing && (
       <EditForm task={task} setIsEditing={setIsEditing}/>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["high", "medium", "low"]).isRequired,
  }).isRequired,
};