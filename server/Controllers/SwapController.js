const SwapRequest=require('../Models/swaprequest');
const Notification=require("../Models/notifications");
const User=require('../Models/user');

exports.getReceivedRequests=async(req,res)=>{
    try{
        const requests=await SwapRequest.find({
            receiver:req.user.id
        })
        .populate('sender','name skillsHave availability')
        .sort({updatedAt:-1})
        res.json(requests);

    }catch(err){
        console.error(err);
        res.status(500).send('server error')
    }
}

exports.updateRequestStatus = async (req, res) => {
  console.log("PATCH HIT");
  console.log("Status:", req.body.status);
const loggedInUser=await User.findById(req.user.id).select("name")
  const request = await SwapRequest.findById(req.params.id);
  console.log("BEFORE:", request.status);

  request.status = req.body.status;
  await request.save();

  const updated = await SwapRequest.findById(req.params.id);
  console.log("AFTER:", updated.status);
 const notification = await Notification.create({
      user: updated.sender, // person who sent request
      text: `${loggedInUser.name} ${updated.status} your swap request`,
      type: updated.status,
      swapId: updated._id,
    });

    // 3️⃣ real-time emit
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");

    const receiverSocketId = onlineUsers[updated.sender.toString()];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-notification", notification);
    }

    // 4️⃣ response
  res.json({updated,notification});
};
exports.getAcceptedSwaps=async(req,res)=>{
    try {
        const swaps=await SwapRequest.find({
            status:"accepted",
            $or:[
                {sender:req.user.id},
                {receiver:req.user.id}
            ]
        })
        .populate("sender","name email")
        .populate("receiver","name email")
        .sort({updatedAt:-1})
        res.json(swaps);
    } catch (error) {
        res.status(500).json({msg:"server error"});
    }
}
exports.completeSwap=async(req,res)=>{
    try {
        const swap=await SwapRequest.findById(req.params.id);
        if(!swap){
            return res.status(404).json({msg:"Swap not found"});
        }
        if(
            String(swap.sender)!==req.user.id &&
            String(swap.receiver)!==req.user.id    
        ) {
            return res.status(403).json({msg:"Not authorized"})
        }
        if(swap.status!="accepted"){
            return res.status(400).json({msg:"only accepted swaps can be completed"})
        }
        swap.status="completed";
        await swap.save();
        res.json(swap)
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
}
exports.history=async(req,res)=>{
    console.log("History endpoint called");
    try {
        const swaps=await SwapRequest.find({
            $or:[
                {sender:req.user.id},
                {receiver:req.user.id}
            ],
            status: { $in: ["accepted", "completed", "rejected"] }
        })
        .populate("sender","name email")
        .populate("receiver","name email")
        .sort({updatedAt:-1})
        console.log("Swaps returned from DB:", swaps.map(s => ({ id: s._id, status: s.status })));

        res.json(swaps);
    } catch (error) {
        res.status(500).json({msg:"server error"});
    }
}
