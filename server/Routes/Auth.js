const express=require('express');
const router=express.Router();
const {signup,login ,getMe}=require('../Controllers/Authcontroller');
const{profile}=require('../Controllers/Profile')
const {auth}=require('../Middleware/Auth');
router.post('/signup',signup);
router.post('/login',login);
router.post('/profile',auth,profile);
router.get('/me',auth,getMe);
module.exports=router;  