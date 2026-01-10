import { useState, useContext } from 'react';
import API from '../../API/api';
import {
    AuthContext

} from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const submit = async (e) => {

        e.preventDefault();
        console.log(form);
        try {
            const res = await API.post('/auth/login', form);
            console.log('login response', res.data);
            localStorage.setItem('token', res.data.token);
            alert('Login successful!');
            console.log('render ')
            login(res.data.token,res.data.user);
            if(res.data.user.profileCompleted){
            navigate('/dashboard');
            }else{
                navigate('/profile');
            }
        } catch (err) {
            alert(err.response?.data?.msg || 'Error');
        }
    };
    /*return (
        <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <form onSubmit={submit} className='mt-10 space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-[360px] text-center border-indigo-700'>
        <h1 className='flex justify-center font-bold text-xl'>Login</h1>
            <input type='email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder='Email' className='w-full p-2 border rounded'autoComplete='username'></input>
            <input type='password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder='Password' className='w-full p-2 border rounded'autoComplete='new-password'></input>
            <button className='bg-indigo-600 text-white font-medium hover:bg-indigo-700 text-white w-full py-2 rounded-full font-semibold'>Login</button>
        </form>
        </div>
    )*/
   return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
    
    <form
      onSubmit={submit}
      className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Login to continue to <span className="text-indigo-600 font-medium">SkillSwap</span>
        </p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          autoComplete="username"
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
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200"
      >
        Login
      </button>

      {/* Footer */}
      <p className="text-sm text-gray-500 text-center">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-indigo-600 font-medium cursor-pointer hover:underline">
          Sign up
        </Link>
      </p>

    </form>
  </div>
);

}

