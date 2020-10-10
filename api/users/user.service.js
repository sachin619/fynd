/* get the database configuration */
const db = require('../../config/database');
module.exports={

    /* create user */
    create:(body,callback)=>{
      db.query(`insert into users (email,first_name,last_name,password,age) values(?,?,?,?,?)`,[
          body.email,
          body.first_name,
          body.last_name,
          body.password,
          body.age, 
      ],(error,result)=>{
       if(error){
           return callback(error);
       }
       return callback(null,result);
      })
    },

    /* getUserByEmailId */
    getUserByEmailId:(emailId,callback)=>{
        db.query(`select * from users where email=?`,[emailId],(error,result)=>{
          if(error){
              return callback(error);
          }
          else{
            return callback(null,result);
          }
        })
    },

    getUserById:(id,callback)=>{
       db.query(`Select * from users where id = ${id}`,(error,data)=>{
           if(error){
            return callback(error);
           }
           return callback(null,data)
       })

    }

}