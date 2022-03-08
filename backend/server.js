const express = require("express");
const app = express();
const cors = require("cors")


const assistant = require('./routes/assistantRoutes')



app.use(express.json())
app.use(cors())


app.use('/assistant', assistant);


module.exports = app;





