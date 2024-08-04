import express from 'express'
import Task from '../models/taskModel';

const router = express.Router()
router.post('/api/new' , async(req,res) => {
   try {
    const {title,description,date,priority,taskID} = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        priority,
        taskID
    })

    const savedTask = await newTask.save();
    console.log(savedTask);
    res.status(201).json(savedTask);
   } catch (error) {
    res.status(400).json({error: error.message});
   }

})

// Partially update a task by ID
router.patch('/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.get('/api/all', async(req,res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.delete('/api/delete/:id', async(req,res) => {
    try {
        const taskToDelete = await Task.findById(req.params.id);
        await taskToDelete.delete();
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        res.status(400).json({error: error.message, message: 'could not delete task'});
    }
}
   
)
export default router;