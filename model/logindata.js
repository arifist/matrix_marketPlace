// npm install bcrypt
const bcrypt = require('bcrypt');

const authdata=[
        {email:"a@b.com",
         password:bcrypt.hashSync("123",10),
         name:"Umay"
        },
        {email:"b@c.com",
         password:bcrypt.hashSync("456",10),
         name:"Ahmet"
        }
    ]

module.exports=authdata;
