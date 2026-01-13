import { createContext,useState,useEffect } from "react";
import  API from '../API/api';
export const AuthContext=createContext();
 import socket from '../socket';
export function AuthProvider({children}){
    const[user,setUser]=useState(null);

useEffect(()=>{
    const token=localStorage.getItem('token')
    const savedUser=localStorage.getItem('user')
    if(token){
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
        API.get('/auth/me').then(res=>setUser(res.data.user)).catch(()=>{
            console.warn("Auth check failed",err.response ?.data ||err)
            localStorage.removeItem('token');
              localStorage.removeItem('user');
            
            setUser(null)
        })
    }
},[]);
const login=(token,userData)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    socket.auth = { token };
  socket.connect();
}
const logout=()=>{
    localStorage.removeItem('token');
      localStorage.removeItem('user');
   
    delete API.defaults.headers.common['Authorization'];
     setUser(null);
    if(socket.connected){
        socket.disconnect();
    }
}
return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
}
//export {  AuthProvider as default };