const config = {
  production:{
    SECRET_TP: process.env.SECRET_TP,
    DATABASE: process.env.MONGODB_URI
  },
  default:{
    SECRET_TP: "MY_SECRET_TOKEN_PASSWORD...SHHHHHHH!!!",
    DATABASE: 'mongodb://localhost:27017/books_shelf'
  }
}

module.exports.get = (env) =>{
  return config[env] || config.default;
}