const express = require('express');
const app = express();
const PORT = 8000;
const Travels = require('./dbHelpers')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const bcrypt = require('bcryptjs')




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

  const hash = bcrypt.hashSync(credentials.password,12)
  credentials.password=hash;

  Travels.addUser(credentials)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error=>res.status(500).json(error))

})

app.post('/users/login',(req,res)=>{
  const {username,password}=req.body;
  Travels.findUserByUsername(username,password)
  .then(user=>{
    if(user && bcrypt.compareSync(password,user.password) ){
      res.status(200).json(user)
    } else{
      res.status(404).json({message:"User does not exist"})
    }
  })
  .catch(err=>{
    res.status(500).json(err)
  })
})

app.get('/users/:username',(req,res)=>{
 const {username}=req.params
  Travels.findUserByUsername(username)
  .then(user=>{
    if(user){
      res.status(200).json(user)
    } else{
      res.status(404).json({message:"User does not exist"})
    }
    
  })
  .catch(error=>{
    res.status(500).json(error)
  })
})

app.delete("/users/:id",(req,res)=>{
  const {id}=req.params
  Travels.removeUser(id)
  .then(count=>{
    if(count>0){
      res.status(200).json({message:"User is deleted"})
    }else{
      res.status(404).json({message:"No user with that id"})
    }
  })
  .catch(error=>{
    res.status(500).json(error)
  })



})

//DESTINATIONS ROUTES

app.get('/destinations',(req,res)=>{
  Travels.getAllDestinations()
  .then(destinations=>{
    res.status(200).json(destinations)
  })
  .catch(error=>{
    res.status(500).json({message:"cannot get destinations"})
  })
})

app.post("/users/:id/destinations",(req,res)=>{
  const {id}=req.params;
  const newDestination = req.body;
    if(!newDestination.user_id){
      newDestination["user_id"]= parseInt(id,10)
    }
Travels.findUserById(id)
.then(user=>{
  if(!user){
    res.status(404).json({message:"user does not exist"})
  }
  if(!newDestination.title || !newDestination.description){
    res.status(400).json({message:"All fields must be complete"})
  }
Travels.addDestination(newDestination,id)
.then(destination=>{
  res.status(200).json(destination)
})
.catch(error=>{
  res.status(500).json({message:"server failed"})
})


})
})

app.delete("/destinations/:id",(req,res)=>{
  const {id}=req.params;
  Travels.removeDestination(id)
  .then(count=>{
    if(count>0){
      res.status(200).json({message:"Destination is deleted"})
    }else{
      res.status(404).json({message:"No destination with that id"})
    }
  })
  .catch(error=>{
    res.status(500).json(error)
  })

})

app.patch("/destinations/:id",(req,res)=>{
  const {id}=req.params;
  Travels.updateDestination(id,req.body)
  .then(destination=>{
    res.status(200).json({message:"destination updated"})
  })
  .catch(error=>{
    res.status(500).json(error)})
})





app.listen(PORT,()=>{
    console.log(`Server running on port http://localhost:${PORT}`)
})