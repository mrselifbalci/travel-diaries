// const knex = require('knex');
// const config = require('./knexfile')
// const db = knex(config.development)

const db = require('./dbConfig');

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

function getUserDestinations (user_id){
 return db("users")
 .join("destinations","users.id","destinations.user_id")
 .select(
   "users.id as UserId",
   "users.imageUrl as UserImage",
   "destinations.id as DestinationId",
   "destinations.title as DestinationTitle"
 )
 .where({user_id:user_id})

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

function groupDestinations (){
  return db("destinations").count()
  .groupBy("title")
  .select(
    "destinations.id",
    "destinations.title"
  )
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
    updateDestination,
    getUserDestinations,
    groupDestinations

}