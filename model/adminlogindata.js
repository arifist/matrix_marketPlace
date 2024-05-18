const bcrypt = require('bcrypt');

const adminauthdata=[
    {email:"a@d.com",
     password:bcrypt.hashSync("543",10),
     name:"Salim"
    },
]
module.exports=adminauthdata;