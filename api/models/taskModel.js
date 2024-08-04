
import { Schema,models,model } from 'mongoose'

const taskModel =  new Schema({
    title:String,
    date:String,
    description:String,
    taskId:Date.now().toString()
})

const Task  =  models.Task || model('my-tasks', taskModel);

export default Task;