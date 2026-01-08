const SwapRequest=require('../Models/swaprequest');
const Notification=require("../Models/notifications");
const User=require('../Models/user');
exports.swaprequest=async(req,res)=>{
    try {
        console.log("here in request");
         const{receiver,skillOffered,skillRequested}=req.body;
         let request=new SwapRequest({sender:req.user.id,receiver,skillOffered,skillRequested,status:'pending'});
             await request.save();
             const loggedInUser = await User.findById(req.user.id).select("name");
            const notification = await Notification.create({
      user: receiver, // notify receiver
      text: `${loggedInUser.name} sent you a new swap request`,
      type: "new_request",
      swapId: request._id,
    });

    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    console.log("onlineUsers in controller", onlineUsers);
    console.log("receiver", receiver);

    const receiverSocket = onlineUsers[receiver];
    if (receiverSocket) {
      io.to(receiverSocket).emit("new-notification", notification);
    }
        
             res.status(201).json(request);
    } catch (err) {
         console.error(err);
        res.status(500).send('server error');
    
    }
}
exports.sendMessage=async(req,res)=>{
    try {
        const{swapId,text}=req.body;
        const swap=await SwapRequest.findById(swapId);
        if(!swap)return res.status(404).json({msg:"Swap not found"});
        if(swap.status !== "accepted"){
            return res.status(403).json({msg:"Swap not accepted yet"})
        }
        const newMessage={
            sender:req.user.id,
            text
        };
        swap.messages.push(newMessage);
        await swap.save();
        
        
        res.json(newMessage);
        console.log("msg length is",swap.messages.length)
    } catch (err) {
        res.status(500).send("Server error")
    }
}