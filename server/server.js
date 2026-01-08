require('dotenv').config();
const socketAuth = require("./socket/socketAuth");
const SwapRequest = require("./Models/swaprequest");

// ⬇️ MUST be before io.on("connection")
//io.use(socketAuth);
const express=require('express');
const mongoose=require 
('mongoose');
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');
const authRoutes=require('./Routes/Auth');
const MatchRoutes=require('./Routes/Match')
const { prototype } = require('node:events');
const app=express();
const server=http.createServer(app);
app.use(express.json()); 

app.use(cors({origin:process.env.CLIENT_URL,credentials:true}));
app.use('/api/auth',authRoutes);
app.use('/api/match',MatchRoutes);


app.get("/api/test", (req, res) => {
  res.json({ msg: "Backend working fine!" });
});
const io=new Server(server,{
  cors:{
    origin:process.env.CLIENT_URL,
    credentials:true
  }
})
io.use(socketAuth);
const onlineUsers={};
app.set("onlineUsers",onlineUsers);
console.log("Initial onlineUsers set on app:", app.get("onlineUsers"));

io.on("connection", (socket) => {
  const onlineUsers = app.get("onlineUsers");

  onlineUsers[socket.userId] = socket.id;
  console.log("User connected:", socket.userId);

  // Join a swap room
  socket.on("joinSwap", (swapId) => {
    socket.join(swapId);
    console.log(`User ${socket.userId} joined swap ${swapId}`);
  });

  // Receive message
  socket.on("sendMessage", async ({ swapId, text }) => {
    const swap = await SwapRequest.findById(swapId);
    if (!swap) return;

    const newMsg = {
      sender: socket.userId,
      text,
      createdAt: new Date(),
    };

    swap.messages.push(newMsg);
    await swap.save();

    // Emit to BOTH users in that swap
    io.to(swapId).emit("receiveMessage", ({ swapId, message:newMsg}));
  });

  socket.on("disconnect", () => {
    delete onlineUsers[socket.userId];
    console.log("User disconnected:", socket.userId);
  });
});


app.set("io",io);
//app.set("onlineUsers",onlineUsers);
const PORT=process.env.PORT|| 5000;
mongoose.connect(process.env.MONGO_URL) .then(()=>{
  console.log('mongodb connected');
  server.listen(PORT,()=>console.log(`server running ${PORT}`))
})
.catch(err => console.error(err));