/*import React from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from'../Components/Auth/Login'

 function Front() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-[360px] text-center">
        
        {/* App Name *//*}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Skill<span className="text-indigo-600">Swap</span>
        </h1>

        {/* Tagline *//*}
        <p className="text-gray-600 mb-8">
          Learn by Teaching. Teach by Learning.
        </p>

        {/* Buttons *//*}
        <div className="flex flex-col gap-4">
          <Link to="/login"className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Login
          </Link>

          <Link to="/signup" className="w-full py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}
export default Front;*/

import React from "react";
import { Link } from "react-router-dom";
import illustration from "./pngm.png";
import logo from "./logo.png"
function Front() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex  items-center">
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
        <h1 className="text-2xl font-bold text-indigo-600">
          SkillSwap
        </h1>

        
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:py-20 py-5 grid grid-cols-1 md:grid-cols-2 md:gap-16 items-center ">

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={illustration}
            alt="Skill collaboration"
            className="w-full max-w-lg"
          />
        </div>
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Exchange Skills. <br />
            <span className="text-indigo-600">Grow Together.</span>
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            SkillSwap connects learners and mentors to exchange real-world skills
            without money — just knowledge.
          </p>

          <div className="flex gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Start Swapping
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        

      </section>
    </div>
  );
}

export default Front;
