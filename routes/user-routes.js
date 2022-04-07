const express = require('express');
const bcrypt = require('bcryptjs')
const Travels = require('../dbHelpers')
const router = express.Router();


router.get('/users',(req,res)=>{
    Travels.getAllUsers()
    .then(users=>{
      res.status(200).json(users)
    })
    .catch(error=>{
     
      res.status(500).json({message:"cannot get the users"})
    }) 
  })
  
  router.post('/users/register',(req,res)=>{
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
  
  router.post('/users/login',(req,res)=>{
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
  
  router.get('/users/:username',(req,res)=>{
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
  
  router.delete("/users/:id",(req,res)=>{
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
  
  
  router.get('/users/:id/destinations',(req,res)=>{
    const {id}=req.params;
    Travels.getUserDestinations(id)
    .then(destinations=>{
      res.status(200).json(destinations)
    })
    .catch(err=>{
      res.status(500).json({message:"cannot get destinations"})
    })
  })
  
  module.exports =router;