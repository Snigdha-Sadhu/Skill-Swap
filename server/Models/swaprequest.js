const mongoose=require("mongoose");
const User=require('./user');
const messageSchema=new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    text:String,
    createdAt:{type:Date,default:Date.now}
})
 const SwapRequestSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
     receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    skillOffered:{
        type:String,
        required:true,

    },
    skillRequested:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected","completed"],
        default:"pending",
    },
    messages:[messageSchema]
 },
{
    timestamps:true,
})
module.exports=mongoose.model("SwapRequest",SwapRequestSchema)