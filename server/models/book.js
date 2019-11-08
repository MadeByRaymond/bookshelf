const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  name:{
    type: String,
    required:true,
    trim:true
  },
  author:{
    type: String,
    required:true,
    trim:true
  },
  review:{
    type: String,
    default:'n/a',
    trim:true
  },
  pages:{
    type: String,
    default:'n/a'
  },
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5,
    default: 0
  },
  price:{
    type:String,
    default:'n/a'
  },
  ownerId:{
    type:String,
    required:true
  }
}, {timestamps:true});


const Books = mongoose.model('Books',bookSchema);

module.exports.Books = Books






