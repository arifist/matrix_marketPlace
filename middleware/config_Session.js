const session = require('express-session'); 

const configSession=session({
    secret: 'd07e9a5a-fc8b-4193-97d9-13f58d2a472a',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:1000*60*60*1
     }
  })

  module.exports = configSession;