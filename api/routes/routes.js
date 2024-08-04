import express from "express";
import Task from "../models/taskModel.js";
import connectToDatabase from "../utils/dbConnection.js";

const router = express.Router();

// Create a new task
connectToDatabase();
router.post("/api/tasks/new", async (req, res) => {
  try {
    const { title, description, date, priority, taskID } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      priority,
      taskID,
    });

    const savedTask = await newTask.save();
    console.log(savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Partially update a task by ID
router.patch("/api/tasks/edit/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks
router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task by ID
router.delete("/api/tasks/delete/:id", async (req, res) => {
    try {
      const taskId = req.params.id;
      console.log(`Received request to delete task with ID: ${taskId}`);
      
      const taskToDelete = await Task.findByIdAndDelete(taskId);
      if (!taskToDelete) {
        console.log(`Task with ID: ${taskId} not found`);
        return res.status(404).json({ message: "Task not found" });
      }
  
      console.log(`Task with ID: ${taskId} deleted successfully`);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        const taskId = req.params.id;
      console.error(`Error deleting task with ID: ${taskId}`, error);
      res.status(400).json({ error: error.message, message: "Could not delete task" });
    }
  });

export default router;
