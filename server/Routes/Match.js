const express=require('express');
const router=express.Router();
const{matchUsers}=require('../Controllers/Matchcontroller')
const{swaprequest,sendMessage}=require('../Controllers/RequestController')
const {auth}=require('../Middleware/Auth');
const {getReceivedRequests, updateRequestStatus,getAcceptedSwaps,completeSwap,history}=require('../Controllers/SwapController');
router.get("/",auth,matchUsers);
router.post('/request',auth,swaprequest);
router.get('/received',auth,getReceivedRequests);
router.get('/accepted',auth,getAcceptedSwaps);
router.patch('/request/:id',auth,updateRequestStatus)
router.put("/accepted/:id",auth,completeSwap);
router.post("/message",auth,sendMessage);
router.get('/history',auth,history);
module.exports=router; 


