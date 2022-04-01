const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);


async function addUser(user){
  await db('users').insert(user)
  return db('users').where({username:user.username})
}

function getAllUsers(){
    return db('users')
} 

function findUserByUsername (username){
  return db('users').where({username:username}).first();
}

function removeUser(id){
  return db('users')
  .where({id:id})
  .del()
}


module.exports = {
    addUser,
    getAllUsers,
    findUserByUsername,
    removeUser
}