import {useState,useContext,useEffect} from 'react';
import API from'../../API/api';
import { AuthContext
    
 } from '../../Context/AuthContext';
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
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <form onSubmit={submit} className=' mt-10 space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-[360px] text-center'autoComplete='off'onKeyDown={e => e.key === 'Enter' && e.preventDefault()}>
        <h1 className='flex justify-center font-bold text-xl'>Sign Up</h1>
        <input type="text" value={form.name} name='signup-name-unique'onChange={e=>setForm({...form,name:e.target.value})}placeholder='Name'className='w-full p-2 border rounded' autoComplete='off'></input>
        <input  type="email" name='signup-email-unique'value={form.email} onChange={e=>setForm({...form,email:e.target.value})}placeholder='Email'className='w-full p-2 border rounded'autoComplete='off'></input>
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}placeholder='Password'className='w-full p-2 border rounded'name='signup-pass-unique'autoComplete='off'></input>
        <button className='bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-full text-white px-4 py-2 rounded-full font-semibold' type='submit'>Sign Up</button>
        </form>
        </div>
    )
}
 
