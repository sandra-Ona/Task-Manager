require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT= 6000;
const taskRouter=require('./routes/taskRouter');
mongoose.set("strictQuery", true);

//middleware
app.use(express.json());

//routes
app.use('/api/v1/tasks', taskRouter);

//error routes
app.use((req, res) =>{
    res.status(404).json({msg: "route not found"});
});

//db connection
const startServer= async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        app.listen (PORT, () =>{
            console.log(`server running on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }

};

startServer();