// code away!
require('dotenv').config()
console.log('this is working');
const server = require('./server.js')


const port = process.env.PORT || 8888

server.listen(port, () => console.log(`listening on port ${port}`))