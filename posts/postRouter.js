const express = require('express');
const Posts = require('../posts/postDb.js')
const helmet = require('helmet'); // importing helmet security middlware
const morgan = require('morgan')

const router = require('express').Router();

const server = express();


server.use(helmet())
server.use(express.json());
server.use(morgan('dev'));

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;