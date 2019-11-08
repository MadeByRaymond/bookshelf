const {Users} = require('../models/user');

let auth = (req,res,next) =>{
  let token = req.cookies.auth;
  console.log(token);
  Users.findByToken(token,(err,user) =>{
    if(err) throw err;
    if(!user) return res.json({
      error:true
    });
    req.token = token;
    req.user = user;
    next();
  })
  
}

module.exports = {auth}