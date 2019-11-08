const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);

const SALT_ROUNDS = 10;

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required:true,
    trim:true,
    unique:1
  },
  password:{
    type: String,
    required:true,
    minlength:6
  },
  name:{
    type: String,
    maxlength:100
  },
  lastname:{
    type: String,
    maxlength:100
  },
  role:{
    type:Number,
    default: 0
  },
  token:{
    type:String
  }
}, {timestamps:true});

// Pre to run before the 'save' if involked --- Hashing Password //
userSchema.pre('save', function(next){
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_ROUNDS,function(err,salt){
      if (err) {
        next(err);
      } else {
        bcrypt.hash(user.password,salt,function(err,hash){
          if(err) return next(err);
          user.password = hash;
          next();
        })
      }
    })
  } else {
    next();
  }
});

// Method to compare paswords
userSchema.methods.comparePass = function(userpassword, cb) {
  bcrypt.compare(userpassword, this.password, function(err,isMatch) {
    if (err) {
      cb(err);
    } else {
      cb(null,isMatch);
    }
  })
}

// Method to generate Token
userSchema.methods.generateToken = function(cb) {
  var token = jwt.sign(this._id.toHexString(),config.SECRET_TP);
  this.token = token;
  
  this.save(function(err,user) {
    if (err) {
      cb(err);
    } else {
      cb(null,user)
    }
  });
  
}

// Statics(Method) to get user by its token //
userSchema.statics.findByToken = function(token,cb) {
  var user = this;
  jwt.verify(token,config.SECRET_TP, function(err, decode) {
    user.findOne({"_id":decode,"token":token},function(err,user) {
      if(err) return cb(err);
      cb(null,user);
    })
  });
}

// Method to Delete Token
userSchema.methods.deleteToken = function(token,cb) {
  var user = this;
  
  user.update({$unset:{token:1}},(err, doc) =>{
    if(err) return cb(err);
    cb(null,user);
  });
  
}

const Users = mongoose.model('Users',userSchema);

module.exports = { Users }








