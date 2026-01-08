const mongoose=require('mongoose');
const SkillSchema=new mongoose.Schema({
    name:String,
    level:{
        type:String,
        enum:["Beginner","Intermediate","Expert"]
    }
},{_id:false});
const UserSchema=new mongoose.Schema({
    name:{
        type:String,required:true},
    email:{
        type:String,required:true},
    passwordHash:{type:String,required:true},
    bio:String,
    skillsHave:[SkillSchema],
    skillsWant:[SkillSchema],
    availability:String,
    profileCompleted:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('User',UserSchema);