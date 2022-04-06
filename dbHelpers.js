const knex = require('knex');
const config = require('./knexfile')
const db = knex(config.development)

//USERS
async function addUser(user) {
  await db('users').insert(user)
  return db('users').where({username:user.username})
    
}

function getAllUsers(){
  return db('users').orderBy('id','desc')   
}

function findUserByUsername(username){
    return db("users").where({username:username}).first(); 
}

function findUserById(id){ 
    return db("users").where({id:id}).first();
}

function removeUser(id){
 return db("users")
 .where({id:id})
 .del()
}

//DESTINATIONS 

function getAllDestinations (){
  return db('destinations').orderBy('id','desc') 
}

async function addDestination (newDestination,user_id){
  await db("destinations")
  .where({user_id:user_id})
  .insert(newDestination)
}

function removeDestination (id){
  return db("destinations")
 .where({id:id})
 .del()
}

function updateDestination (id,newDestination){
 return db("destinations")
 .where({id:id})
 .update(newDestination)

}



module.exports={
    addUser,
    getAllUsers,
    findUserByUsername,
    findUserById,
    removeUser,
    getAllDestinations,
    addDestination,
    removeDestination,
    updateDestination

}