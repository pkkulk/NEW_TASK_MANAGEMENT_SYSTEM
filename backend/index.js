const express=require("express");
const mongo = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");
const T =require("./Routes/TaskRoutes");
const { default: mongoose } = require("mongoose");
  
require("dotenv").config();
const app=express();
app.use(cors({
    origin: [
      "http://localhost:5173",  // Local frontend
      "https://new-task-management-system-1yqy.vercel.app" // Deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
    credentials: true // Allow cookies if needed
  }));
  app.options("*", cors());
app.use(express.json());
app.use("/api/TaskRoutes",T);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("connected to mongoDB")} )
.catch((error)=> console.log("Error connecting to mongoDB",error));
const PORT =process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("server is running on port",PORT);
});