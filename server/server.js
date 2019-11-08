const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); 

const config = require('./config/config').get(process.env.NODE_ENV);

const {Users} = require('./models/user');
const {Books} = require('./models/book');
const {auth} = require('./middleware/auth');

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true).set('useCreateIndex', true);
mongoose.connect(config.DATABASE, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cookieParser());
// app.use((req,res,next) =>{
//     // res.header('Access-Control-Allow-Origin','*');
//     next();
// })


// ---------- GET REQUESTS ---------- //

// Get Single Book By Id //
app.get('/api/getBook_single', (req,res) =>{
  let id = req.query.id;
  
  Books.findById(id,(err, doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(doc);
    }
  });
  
});

// Get Many Books with query limiters skip, limit, order //
app.get('/api/getBooks', (req,res) =>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  // ORDER = asc || desc
  Books.find().skip(skip).sort({_id:order}).limit(limit).exec((err, doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(doc);
    }
  });
  
});

// Get Reviewer's or User's Name and Last Name //
app.get('/api/getReviewer', (req,res) =>{
  let id = req.query.id;
  
  Users.findById(id,(err,doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.json({"name":doc.name,"lastname":doc.lastname});
    }
  });
  
});

// Get User with query limiters skip, limit, order //
app.get('/api/users', (req,res) =>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  
  // ORDER = asc || desc
  Users.find({}).skip(skip).sort({_id:order}).limit(limit).exec((err, users) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(users);
    }
  });
  
});

// Get User/Reviewer Posts with ownerId and with query limiters skip, limit, order //
app.get('/api/user_posts', (req,res) =>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  
  // ORDER = asc || desc
  Books.find({'ownerId':req.query.user}).skip(skip).sort({_id:order}).limit(limit).exec((err, doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(doc);
    }
  });
  
});

// Logout User, Unset and Delete Token //
app.get('/api/logout', auth, (req,res) =>{
  req.user.deleteToken(req.token, (err,user) =>{
    if(err) return res.status(400).send(err);
    res.sendStatus(200);
  })
});

app.get('/api/auth', auth, (req,res) =>{
  res.json({
    isAuth:true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname
  })
})



// ---------- POST REQUESTS ---------- //

// Save New Book To Database //
app.post('/api/book', (req, res) =>{
  const book = new Books(req.body);
  
  book.save((err,doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.json({
        post:true,
        bookId: doc._id
      })
    }
  });
  
});

// Get Many Books with Find Condition and query limiters skip, limit, order //
app.post('/api/getBooks', (req, res) =>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  
  Books.find(req.body).skip(skip).sort({_id:order}).limit(limit).exec((err, doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(doc);
    }
  });
  
});

// Register New Users To Database //
app.post('/api/register',(req,res) =>{
  const user = new Users(req.body);
  
  user.save((err,doc) =>{
    if (err) {
      res.status(400).json({success:false, message:err});
    } else {
      res.json({success:true, user:doc});
    }
  });
});

// Login Existing User //
app.post('/api/login',(req,res) =>{
  
  Users.findOne({'email':req.body.email},(err,user) =>{
    if (err) {
      res.status(400).json({status:'error',message:err});
    } else {
      if (!user) {
        res.json({isAuth:false,message:'User is not recognized'});
      } else {
        user.comparePass(req.body.password, (err, isMatch) =>{
          if (err) {
            res.status(400).json({status:'error',message:err});
          } else {
            if (!isMatch) {
              res.json({isAuth:false,message:'User Password Incorrect'});
            } else {
              user.generateToken((err,doc) =>{
                if(err) return status(400).send(err);
                res.cookie('auth',user.token).json({isAuth:true,message:'User OK!',id:user._id,email:user.email});
              })
            }
          }
        });
      }
    }
  });
  
});

// Get User with Find Condition and query limiters skip, limit, order //
app.post('/api/users', (req,res) =>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  
  // ORDER = asc || desc
  Users.find(req.body).skip(skip).sort({_id:order}).limit(limit).exec((err, users) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(users);
    }
  });
  
});



// ---------- UPDATE REQUESTS ---------- //

// Updating Book //
app.post('/api/book_update', (req, res) =>{
  console.log(req.body);
  Books.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.json({
        success:true,
        doc
      })
    }
  });
  
});



// ---------- DELETE REQUESTS ---------- //

// Deleting a Book //
app.post('/api/delete_book', (req, res) =>{
  let id = req.query.id;
  
  Books.findByIdAndRemove(id,(err,doc) =>{
    if (err) {
      res.status(400).send(err)
    } else {
      res.json({
        success:true,
        deleted_doc: doc
      })
    }
  });
  
});




const port = process.env.PORT || 3001
app.listen(port,() =>{
  console.log(`Server started at port: ${port}`);
});