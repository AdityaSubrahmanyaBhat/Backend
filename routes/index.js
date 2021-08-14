const express = require('express');
const Todo=require('../models/todo');
const functions=require('../methods/functions')

const router=express.Router();

router.get('/', functions.landingPage);

router.put('/add',functions.add);

router.get('/getTasks',functions.getTasks);

router.post('/register',functions.register);

router.post('/login',functions.login);

router.delete('/delete',functions.delete);

module.exports=router;