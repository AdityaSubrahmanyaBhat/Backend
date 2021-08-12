const express = require('express');
const Todo=require('../models/todo');
const functions=require('../methods/functions')

const router=express.Router();

router.get('/', (req, res) => {
    res.status(200).json({status:'200-OK',message:`This is the home page  , URL = ${req.url}`});
});

// router.get('/get', (req, res) => {
//     res.status(200).json({
//         status:'200-OK',
//         message:`This is the todoList page  , URL = ${req.url}`
//     });
// });

router.post('/add',functions.add);

router.get('/getTodos',functions.getTodos);

module.exports=router;