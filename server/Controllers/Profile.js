const User=require('../Models/user');
exports.profile=async(req,res)=>{
    console.log(req.body);
     
    try{
        
        const{ skillsHave,skillsWant,bio,availability}=req.body;
   const user=await User.findByIdAndUpdate(req.user.id,{ skillsHave,skillsWant,bio,availability, profileCompleted:true},{
        new:true,      
        runValidators:true
    });
    res.json(user);
    }catch(err){
        console.error(err);
        res.status(500).send('server error');
    }
};