const express = require('express');
const Users = require('../users/userDb.js')
const helmet = require('helmet'); // importing helmet security middlware
const morgan = require('morgan')
const logger = require('../server.js')

const router = require('express').Router();

const server = express();

server.use(helmet())
server.use(express.json());
server.use(logger);
server.use(validateUserId)
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

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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

};

module.exports = router;
