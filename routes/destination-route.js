const express = require('express');
const Travels = require('../dbHelpers')
const router = express.Router();

//DESTINATIONS ROUTES

router.get('/destinations',(req,res)=>{
    Travels.getAllDestinations()
    .then(destinations=>{
      res.status(200).json(destinations)
    })
    .catch(error=>{
      res.status(500).json({message:"cannot get destinations"})
    })
  })
  
  router.post("/users/:id/destinations",(req,res)=>{
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
  
  router.delete("/destinations/:id",(req,res)=>{
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
  
  router.patch("/destinations/:id",(req,res)=>{
    const {id}=req.params;
    Travels.updateDestination(id,req.body)
    .then(destination=>{
      res.status(200).json({message:"destination updated"})
    })
    .catch(error=>{
      res.status(500).json(error)})
  })

  
  router.get('/destinations/:id',(req,res)=>{
    const {id}=req.params
     Travels.findDestinationById(id)
     .then(destination=>{
       if(destination){
         res.status(200).json(destination)
       } else{
         res.status(404).json({message:"destination does not exist"})
       }
       
     })
     .catch(error=>{
       res.status(500).json(error)
     })
   })
  
  
  //GROUP BY
  
  router.get('/destinationNumbers',(req,res)=>{
    Travels.groupDestinations()
    .then(destination=>{
      res.status(200).json(destination)
    })
    .catch(error=>{
      res.status(500).json(error)})
  })
  
  module.exports =router;