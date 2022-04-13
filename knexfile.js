// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/traveldiaries.sqlite3'
    },
    useNullAsDefault:true
  },
  pool:{
    afterCreate:(conn,done)=>{
      conn.run("PRAGMA foreign_keys=ON",done)
    }
  },
  production:{
    client:'pg',
    connection:process.env.DATABASE_URL,
    pool:{
      min:2,
      max:10
    },
    migrations:{
      tablename:'knex_migrations',
      directory:"./migrations"
    },
    ssl: {
      required: true // This line will fix new error
    }
    
  }

};
