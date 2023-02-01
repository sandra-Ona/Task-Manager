const Tasks = require ("../model/tasks")

//get all tasks
const getAllTasks = async(req, res) =>{
    try{
        const tasks = await Tasks.find();
        res.status(200).json({ numOftasks:tasks.length, tasks});
    } catch (error){
        console.log(error);
        res.status(500).json ({msg: 'error'});
    }
};

//get a single task
const getTask = async(req, res) => {
   const {taskId} = req.params;
   try{
     const task = await Tasks.findOne({ _id: taskId })
     if (!task){
        return res.status(404).json({msg: `Task with id ${taskId} not found`});
     }
     res.status(200).json({task})
   }catch(error){
    console.log(error);
    res.status(500).json ({msg: 'error'});
}
}
    

//create task
const createTask = async(req, res) => {
    try{
        const {title, priority}= req.body
        if (!title || !priority) {
          return res.status(400).json({msg: 'please provide necessary information'})
        }
        const task =await Tasks.create(req.body);
        res.status(201).json({msg: 'task created', task})
      } catch (error){
          console.log(error);
          res.status(500).json ({msg: 'error'});
      }
  }


//update task
const updateTask = async(req, res) => {
       
        try{
            const {taskId} = req.params;
            const task =await Tasks.findByIdAndUpdate( {_id:taskId}, req.body, {new:true, runValidators:true});
            res.status(201).json({msg: 'task updated', task})
          } catch (error){
              console.log(error);
              res.status(500).json ({msg: 'error'});
          } 
        }
     
  
 
//delete task
const deleteTask = async(req, res) => {
        const {taskId} = req.params;
        try{
          const task = await Tasks.findByIdAndDelete({ _id: taskId })
          if (!task){
             return res.status(404).json({msg: `Task with id ${taskId} not found`});
          }
          res.status(200).json({msg: 'deleted'})
        }catch(error){
         console.log(error);
         res.status(500).json ({msg: 'error'});
     }
     }
   
//export
module.exports ={getAllTasks, getTask, createTask, deleteTask, updateTask};