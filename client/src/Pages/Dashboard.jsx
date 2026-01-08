
import React, { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import NotificationBell from '../Components/notification/NotificationBell';
import API from '../API/api';
const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
const[me,setMe]=useState(null);
 useEffect(()=>{
      API.get('/auth/me')
      .then(res=>{
        console.log("IN DASHBOARD",res.data);
        console.log("in name",res.data.name)
        setMe(res.data);
        console.log(me.name);
 })
      .catch(err=>console.log(err));
    },[])
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/front');
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* 🔹 Navbar */}
      <nav className="bg-gradient-to-r from-white via-gray-50 to-white
  shadow-md
  px-8 py-3
  flex items-center justify-between">
       <h1 className="
  text-2xl font-extrabold tracking-wide
  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
  bg-clip-text text-transparent
">
  SkillSwap
</h1>




        <div className="flex items-center gap-6">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg
                       hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* 🔹 Body */}
      <div className="px-10 py-12">
        
        {/* Title */}
       <div className="
  bg-white/10 backdrop-blur-md
  rounded-2xl
  px-10 py-8
  mb-10
  shadow-lg
  border border-white/20
">
  <div className="flex items-baseline justify-center gap-3">
    {/* Welcome */}
    <span className="
      text-2xl md:text-3xl
      font-semibold
      text-white/90
      tracking-wide
    ">
      Welcome
    </span>

    {/* Name */}
    <span className="
      text-4xl md:text-5xl
      font-extrabold
      text-white
      tracking-tight
      drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]
    ">
      {me?.name
        ?.charAt(0).toUpperCase() + me?.name?.slice(1)}
    </span>
  </div>
</div>



        {/* Cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          
          {/* Card 1 */}
          <div
            onClick={() => navigate('/match')}
            className="w-56 h-56 cursor-pointer rounded-2xl
                       bg-gradient-to-br from-white to-indigo-100
                       shadow-2xl hover:scale-105 transition-all
                       flex flex-col items-center justify-center"
          >
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-gray-800">
              Find Matches
            </h3>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('/received')}
            className="w-56 h-56 cursor-pointer rounded-2xl
                       bg-gradient-to-br from-white to-purple-100
                       shadow-2xl hover:scale-105 transition-all
                       flex flex-col items-center justify-center"
          >
            <span className="text-4xl mb-4">📥</span>
            <h3 className="text-lg font-semibold text-gray-800">
              Requests
            </h3>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('/accepted')}
            className="w-56 h-56 cursor-pointer rounded-2xl
                       bg-gradient-to-br from-white to-pink-100
                       shadow-2xl hover:scale-105 transition-all
                       flex flex-col items-center justify-center"
          >
            <span className="text-4xl mb-4">🤝</span>
            <h3 className="text-lg font-semibold text-gray-800">
              My Swaps
            </h3>
          </div>

          {/* Card 4 — History */}
          <div
            onClick={() => navigate('/history')}
            className="w-56 h-56 cursor-pointer rounded-2xl
                       bg-gradient-to-br from-white to-rose-100
                       shadow-2xl hover:scale-105 transition-all
                       flex flex-col items-center justify-center"
          >
            <span className="text-4xl mb-4">🕒</span>
            <h3 className="text-lg font-semibold text-gray-800">
              History
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/*import React, { useEffect, useState } from 'react'
import {
     AuthContext
 
 } from '../Context/AuthContext';
import NotificationBell from '../Components/notification/NotificationBell';
 import { useContext } from 'react';
 import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const HandleLogout = async (e) => {

        e.preventDefault();
        console.log("in logout phase");
        try {
          await logout();
            alert('logout successfully');
          navigate('/front');
        } catch (error) {
           alert('Error');
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className="absolute top-4 right-4">
        <NotificationBell />
      </div>
         <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Skill Swap Dashboard</h1>
      
      <div className='space-y-4'>
<button onClick={()=>navigate("/match")}className='w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition'>Find Skill Matches</button>
<button onClick={()=>navigate("/received")}className='w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition'>Received Requests</button>
<button onClick={()=>navigate("/accepted")}className='w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition'>My Swaps</button>
<button onClick={HandleLogout} className='w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition'>Logout</button>
      </div>
     </div>

   
    </div>
  )
}

export default Dashboard*/
