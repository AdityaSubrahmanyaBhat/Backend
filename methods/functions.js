var Todo = require('../models/todo');
var User = require('../models/user');
var jwt=require('jwt-simple')

var functions = {
    landingPage:(req, res,next) => {
        res.status(200).json({status:'200-OK',message:`This is the home page  , URL = ${req.url}`});
    },
    add: (req, res,next) => {
        if (!req.body.title) {
            res.status(400).json({ status: `400-Bad Request`, success: false, message: "Enter the title" });
        } else {
            var newTodo = Todo({
                title: req.body.title,
                description: req.body.description??"",
            });
            User.findOne({name:req.body.name},function(err,user){
                if(!err){
                    user.tasks.push(newTodo);
                user.save(function(err,updatedUser){
                    res.status(200).send(`${user}`);
                });
                }else{
                    res.status(500).json({ status: "500-Internal server error", success: false, message: "Failed to update", });
                }
            });
        }
    },
    delete:(req,res,next)=>{
        if(!req.body.title||!req.body.uid){
            res.status(400).send("400-Bad Request");
        }else{
            // User.findOne({uid:req.body.uid},function(err,user){
            //     if(!err){

            //         var val=user.tasks.findIndex(function(element){
            //             element.title===req.body.title
            //         })
            //         //res.send(`${val}`)
            //         user.tasks.splice(val,1);
            //         user.save(function(err,updatedUser){
            //             res.status(200).send(`${user}`);
            //         });                    
            //     }else{
            //         throw err;
            //     }
            // }); 
        }
    },
    getTasks: (req, res,next) => {
        // Todo.find((err, docs) => {
        //     if (!err) res.status(200).send(docs);
        //     else {
        //         res.status(400).json({ status: "400-Bad Request", message: `${err.message}` });
        //     }
        // });
        User.findOne({
            uid:req.query.uid,
        })
        .then((user)=>{
            if(!user)res.status(400).send(`No user found  ${err}`);
            else {
                res.status(200).send(`${user}`);
            }
        }).catch(next);
    },
    register: (req, res,next) => {
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
    login:(req,res,next)=>{
        User.findOne({
            uid:req.query.uid
        }).then((user)=>{
            if(!user){
                res.status(403).send({success:false,message:"User not found"});
            }
            else if(user){
                res.status(200).send(user);
            }
            else{
                user.comparePassword(req.query.password,function(err,isMatch){
                    if(isMatch&&!err){
                        var token=jwt.encode(user,'secret');
                        res.json({success:true,message:"Success",token:token}); 
                     }
                     else{
                         return res.status(403).send({success:false,message:"Password does not match"});
                     }
                });
            }
        }).catch(next);
    },
}

module.exports = functions;