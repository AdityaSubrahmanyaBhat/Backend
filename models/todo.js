const mongoose  = require("mongoose");

var Schema = mongoose.Schema;

var todoSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    taskId:{
        type:String
    },
});

module.exports=mongoose.model("Todo",todoSchema);