
import React, { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import NotificationBell from '../Components/notification/NotificationBell';
import API from '../API/api';
import logo from'./logo.png'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* 🔹 Navbar */}
      <nav className="bg-gradient-to-r from-white via-gray-50 to-white
  shadow-md
  px-8 py-3
  flex items-center justify-between">
    <div className=' flex  items-center'>
      <img
                src={logo}
                alt="SkillSwap logo"
                className="h-9 w-9 md:h-11 md:w-11
    mr-2 md:mr-3
    rounded-xl
    bg-white/70
    p-2
    shadow-md
    ring-1 ring-indigo-200
    backdrop-blur"
              />
       <h1 className="
  text-2xl font-bold text-indigo-600
">
  SkillSwap
</h1>

</div>



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
       <div className="mb-10">
  <div className="flex items-baseline justify-center gap-3">
    {/* Welcome */}
    <span className="
      text-2xl md:text-3xl
      font-medium
      text-gray-600
      tracking-wide
    ">
      Welcome
    </span>

    {/* Name */}
    <span className="
     text-4xl md:text-5xl
      font-extrabold
      bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 
      bg-clip-text text-transparent
      tracking-tight
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
bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500
shadow-[0_14px_30px_rgba(56,189,248,0.45)]
hover:shadow-[0_20px_45px_rgba(56,189,248,0.6)]
hover:-translate-y-1
transition-all duration-300
flex flex-col items-center justify-center
text-white
"
          >
            <span className="text-4xl mb-4 bg-white/20 p-4 rounded-full">🔍</span>
            <h3 className="text-lg font-semibold text-white-800">
              Find Matches
            </h3>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('/received')}
            className="w-56 h-56 cursor-pointer rounded-2xl
bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500
shadow-[0_14px_30px_rgba(56,189,248,0.45)]
hover:shadow-[0_20px_45px_rgba(56,189,248,0.6)]
hover:-translate-y-1
transition-all duration-300
flex flex-col items-center justify-center
text-white"
          >
            <span className="text-4xl mb-4 bg-white/20 p-4 rounded-full">📥</span>
            <h3 className="text-lg font-semibold text-white">
              Requests
            </h3>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('/accepted')}
            className="w-56 h-56 cursor-pointer rounded-2xl
bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500
shadow-[0_14px_30px_rgba(56,189,248,0.45)]
hover:shadow-[0_20px_45px_rgba(56,189,248,0.6)]
hover:-translate-y-1
transition-all duration-300
flex flex-col items-center justify-center
text-white"
          >
            <span className="text-4xl mb-4 bg-white/20 p-4 rounded-full">🤝</span>
            <h3 className="text-lg font-semibold ">
              My Swaps
            </h3>
          </div>

          {/* Card 4 — History */}
          <div
            onClick={() => navigate('/history')}
            className="w-56 h-56 cursor-pointer rounded-2xl
bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500
shadow-[0_14px_30px_rgba(56,189,248,0.45)]
hover:shadow-[0_20px_45px_rgba(56,189,248,0.6)]
hover:-translate-y-1
transition-all duration-300
flex flex-col items-center justify-center
text-white"
          >
            <span className="text-4xl mb-4 bg-white/20 p-4 rounded-full">🕒</span>
            <h3 className="text-lg font-semibold ">
              History
            </h3>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

