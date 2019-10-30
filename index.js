// code away!
const express = require('express');
console.log('this is working');

const postRouter = require('./posts/postRouter.js')
const userRouter = require('./users/userRouter.js')

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)



const port = 8888

server.listen(port, () => console.log(`listening on port ${port}`))