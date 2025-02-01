const express=require("express");
const mongo = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");
const T =require("./Routes/TaskRoutes");
const { default: mongoose } = require("mongoose");
  
require("dotenv").config();
const app=express();
const allowedOrigins = [
    "http://localhost:5173",  // Local frontend
    "https://new-task-management-system-1yqy-nx74dvgee.vercel.app"  // Deployed frontend
];
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (you can restrict it later)
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle preflight requests (OPTIONS method)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});


app.use(express.json());
app.use("/api/TaskRoutes",T);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("connected to mongoDB")} )
.catch((error)=> console.log("Error connecting to mongoDB",error));
const PORT =process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("server is running on port",PORT);
});