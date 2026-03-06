require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 2000 || process.env.PORT;
const cookieParser = require("cookie-parser");
const Authroutes = require("./Routes/AuthRoutes");
const connectdb = require("./Config/db");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
connectdb();


app.use('/api/users',Authroutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})