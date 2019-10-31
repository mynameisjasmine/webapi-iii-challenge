const express = require('express');
const server = express();

server.use(express.json());
server.use(logger)
const userRouter = require('./users/userRouter.js')
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
console.log(`[on ${Date.now()} sending ${req.method} to ${req.url}]`)

next()
};

module.exports = server;
