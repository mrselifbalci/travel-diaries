require("dotenv").config()
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors');
app.use(cors({origin:'*'}))

//IMPORT ROUTERS

const usersRouter =  require('./routes/user-routes')
const destinationsRouter = require('./routes/destination-route')



//USE THE ROUTES

app.use('/',usersRouter)
app.use('/',destinationsRouter)







app.get('/',(req,res)=>{
  res.status(200).json({message:"Welcome to the server"})
})


app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port}`)
})