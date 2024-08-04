
import pkg from 'mongoose';
const { Schema, model, models } = pkg;

const TaskModel =  new Schema({
    title:String,
    date:String,
    description:String,
    priority:String,
    taskID:String
})

const Task  =  models.Task || model('my-tasks', TaskModel);

export default Task