const User=require('../Models/user');

exports.matchUsers=async(req,res)=>{

    try{
        const currentUser=await User.findById(req.user.id);
        const wantSkillNames=currentUser.skillsWant.map(
            skill=>skill.name
        );
        const matchedUsers=await User.find({
            _id:{$ne:req.user.id},
            "skillsHave.name":{$in:wantSkillNames}
        });
        res.json(matchedUsers);
    }catch (err){
        res.status(500).json({msg:"Matching failed"});
    }

}