const express = require('express');
const Users = require('../users/userDb.js')
const Posts = require('../posts/postDb/js')
const helmet = require('helmet'); 
const morgan = require('morgan')


const router = require('express').Router();

const server = express();

server.use(helmet())
server.use(express.json());
server.use(morgan('dev'));


router.post('/', validateUser, (req, res) => {
Users.insert(req.body)
.then(addUser => {
 res.status(200).json(addUser)
})
.catch(err => {
console.log(err);
res.status(500).json({message: "There was an error adding the user"})
})
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
Posts.insert(req.body)
.then(post => {
res.status(200).json(post)   
})
.catch(err => {
console.log(err);
res.status(500).json({message: "There was an error adding the post"})
  })
});

router.get('/', (req, res) => {
Users.get()
.then(users => {
res.status(200).json(users)    
})
.catch(err => {
    console.log(err);
    res.status(500).json({message: "There was an error getting the user"})
      })
});

router.get('/:id',validateUserId, (req, res) => {
const id = req.params.id
Users.getById(id)
.then(userId => {
res.status(200).json(userId)   
})
.catch(err => {
console.log(err);
res.status(500).json({message: "There was an error getting the user by this id"})
 })
});

router.get('/:id/posts',validateUserId, (req, res) => {
const id = req.params.id
Posts.getUserPosts(id)
.then(posts => {
res.status(200).json(posts)     
})
.catch(err => {
 console.log(err);
 res.status(500).json({message: "There was an error getting the user's posts by this id"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
const id = req.params.id
Users.remove(id)
.then(deleted => {
res.status(200).json(deleted)    
})
.catch(err => {
 console.log(err);
res.status(500).json({message: "There was an error deleting this record"})
     })
});

router.put('/:id',validateUserId, (req, res) => {
const id = req.params.id
Users.update(id, req.body)
.then(updated => {
res.status(200).json(updated)    
})
.catch(err => {
console.log(err);
res.status(500).json({message: "There was an error updating this record"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
const password = req.headers.password;
if(password === '') {
    res.status(400).json({message: 'please provide a password'})
  }
  else if(password.toLowerCase() === 'password') {
    next();

  } else {
    res.status(400).json({message: "invalid user id"})
   
 }
};

function validateUser(req, res, next) {
const {body, name} = req.body
if (!body) {
 res.status(400).json({message: "missing user data"})
} else if (!name) {
res.status(400).json({message: "missing required name field"})  
} else {
next()
 }
};

function validatePost(req, res, next) {
const {body, text} = req.body
if (!body) {
res.status(400).json({message: "missing post data"})   
} else if (!text) {
res.status(400).json({message: "missing required text field"})  
} else {
 next()
 }
};

module.exports = router;
