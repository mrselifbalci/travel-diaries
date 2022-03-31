const express = require('express');
const app = express();
const PORT = 8000;
const Travels = require('./dbHelpers')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


//ROUTES
app.get('/',(req,res)=>{
  res.status(200).json({message:"Welcome to the server"})
})

app.get('/users',(req,res)=>{
  Travels.getAllUsers()
  .then(users=>{
    res.status(200).json(users)
  })
  .catch(error=>{
    res.status(500).json({message:"cannot get the users"})
  }) 
})

app.post('/users/register',(req,res)=>{
  const credentials = req.body;
  const {username,password} = credentials;
  if(!(username && password)){
    return res.status(400).json({message:"Username and password required."})
  }
  Travels.addUser(credentials)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error=>res.status(500).json(error))

})

app.get('/users/:username',(req,res)=>{
 const {username}=req.params
  Travels.findUserByUsername(username)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error=>{
    res.status(500).json(error)
  })
})




app.listen(PORT,()=>{
    console.log(`Server running`)
})