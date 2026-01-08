import { useState, useContext } from 'react';
import API from '../../API/api';
import {
    AuthContext

} from '../../Context/AuthContext';
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
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <form onSubmit={submit} className='mt-10 space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-[360px] text-center'>
        <h1 className='flex justify-center font-bold text-xl'>Login</h1>
            <input type='email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder='Email' className='w-full p-2 border rounded'autoComplete='username'></input>
            <input type='password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder='Password' className='w-full p-2 border rounded'autoComplete='new-password'></input>
            <button className='bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white w-full py-2 rounded-full font-semibold'>Login</button>
        </form>
        </div>
    )
}

