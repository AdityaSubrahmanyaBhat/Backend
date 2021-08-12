var Todo = require('../models/todo');
var User = require('../models/user');
var jwt=require('jwt-simple')

var functions = {
    add: (req, res) => {
        if (!req.body.title) {
            res.status(400).json({ status: `400-Bad Request`, success: false, message: "Enter the title" });
        } else {
            var newTodo = Todo({
                title: req.body.title,
                description: req.body.description,
            });
            newTodo.save(function (err, todo) {
                if (!err) {
                    res.status(200).json({ status: "200 OK", success: true, message: "New todo added", });
                } else {
                    res.status(500).json({ status: "500-Internal server error", success: false, message: "Failed to save", });
                }
            });
        }
    },
    getTodos: (req, res) => {
        Todo.find((err, docs) => {
            if (!err) res.status(200).send(docs);
            else {
                res.status(400).json({ status: "400-Bad Request", message: `${err.message}` });
            }
        });
    },
    register: (req, res) => {
        if(!req.body.name||!req.body.email||!req.body.password||!req.body.uid){
            res.status(400).send("Fields must not be empty");
        }else{
            var newUser=User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                uid:req.body.uid,
                tasks:[],
            });
            newUser.save((err,user)=>{
                if(!err)return res.status(200).send(`Created new user - ${user}`);
                else{
                    return res.status(500).send(`Failed to create new user ${err}`);
                }
            });
        }
    },
    login:(req,res)=>{
        User.findOne({
            name:req.body.name,
            email:req.body.email,
            uid:req.body.uid
        },(err,user)=>{
            if(err)throw err;
            if(!user){
                res.status(403).send({success:false,message:"User not found"});
            }
            else{
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch&&!err){
                        var token=jwt.encode(user,'secret');
                        res.json({success:true,message:"Success",token:token}); 
                     }
                     else{
                         return res.status(403).send({success:false,message:"Password does not match"});
                     }
                })
            }
        });
    },
}

module.exports = functions;