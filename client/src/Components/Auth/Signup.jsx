import {useState,useContext,useEffect} from 'react';
import API from'../../API/api';
import { AuthContext
    
 } from '../../Context/AuthContext';
 import { Link } from 'react-router-dom';
 import {useNavigate} from'react-router-dom';
 export default function Signup(){
    const[form,setForm]=useState({name:'',email:'',password:''});
const {login}=useContext(AuthContext);
const navigate=useNavigate();
//const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Run this once when component mounts
 useEffect(() => {
  const timer = setTimeout(() => {
    setForm({ name: '', email: '', password: '' });
  }, 50);
  return () => clearTimeout(timer);
}, []);// empty dependency array => runs only once

const submit=async(e)=>{

    e.preventDefault();
    console.log(form);
    try{
        const res=await API.post('/auth/signup',form);
        login(res.data.token,res.data.user);
        navigate('/profile');
    }catch(err){
const msg=(err.response?.data?.msg|| 'signup failed');
alert(msg);
if(msg.includes('User exists')){
    navigate('/login');
}
    }
    };
    /*return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <form onSubmit={submit} className=' mt-10 space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-[360px] text-center'autoComplete='off'onKeyDown={e => e.key === 'Enter' && e.preventDefault()}>
        <h1 className='flex justify-center font-bold text-xl'>Sign Up</h1>
        <input type="text" value={form.name} name='signup-name-unique'onChange={e=>setForm({...form,name:e.target.value})}placeholder='Name'className='w-full p-2 border rounded' autoComplete='off'></input>
        <input  type="email" name='signup-email-unique'value={form.email} onChange={e=>setForm({...form,email:e.target.value})}placeholder='Email'className='w-full p-2 border rounded'autoComplete='off'></input>
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}placeholder='Password'className='w-full p-2 border rounded'name='signup-pass-unique'autoComplete='off'></input>
        <button className='bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-full text-white px-4 py-2 rounded-full font-semibold' type='submit'>Sign Up</button>
        </form>
        </div>
    )*/
   return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
    
    <form
      onSubmit={submit}
      autoComplete="off"
      className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >

      {/* Branding */}
      <h1 className="text-center text-2xl font-bold text-indigo-600">
        SkillSwap
      </h1>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create account</h2>
        <p className="text-gray-500 text-sm mt-1">
          Join SkillSwap and start exchanging skills
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Full name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="John Doe"
          autoComplete="off"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email address
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          autoComplete="off"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          autoComplete="new-password"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Sign Up
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium cursor-pointer hover:underline">
          Login
        </Link>
      </p>

    </form>
  </div>
);

}
 
