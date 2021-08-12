var Todo = require('../models/todo');

var functions = {
    add: (req, res) => {
        if (!req.body.title) {
            res.status(400).json({ status: `400-Bad Request`,success:false, message: "Enter the title" });
        } else {
            var newTodo = Todo({
                title: req.body.title,
                description: req.body.description,
            });
            newTodo.save(function (err, todo) {
                if (!err) {
                    res.status(200).json({status:"200 OK", success: true, message: "New todo added", });
                } else {
                    res.status(500).json({status:"500-Internal server error", success: false, message: "Failed to save", });
                }
            });
        }
    },
    getTodos:(req,res)=>{
        Todo.find((err,docs)=>{
             if(!err)res.status(200).send(docs)//res.status(200).json({status:"200-OK",message:`${docs}`});
             else{
                 res.status(400).json({status:"400-Bad Request",message:`${err.message}`});
             }
        });
    }
}

module.exports=functions;