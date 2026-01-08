import React from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
 function Front() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-[360px] text-center">
        
        {/* App Name */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Skill<span className="text-indigo-600">Swap</span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 mb-8">
          Learn by Teaching. Teach by Learning.
        </p>

        {/* Buttons */}
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
export default Front;