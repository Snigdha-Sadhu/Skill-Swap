import { createContext,useState,useEffect } from "react";
import  API from '../API/api';
export const AuthContext=createContext();
 import socket from '../socket';
export function AuthProvider({children}){
const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  
  });
  
  const [token, setToken] = useState(() => localStorage.getItem("token"));
const [loading, setLoading] = useState(true);

  useEffect(() => {
     console.log("Token at useEffect:", token);
    if (!token) {
        setUser(null);
        setLoading(false);
        return;
    }
      // Set the auth header for API calls
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Verify token and get fresh user data from server
      API.get("/auth/me")
        .then((res) => {
            console.log("Auth/me success:", res.data.user);
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch((err) => {
          console.warn("Auth check failed", err.response?.data || err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          
            
            setUser(null);
            setToken(null);
        }).finally(() => setLoading(false));
      
    
},[token]);
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
return <AuthContext.Provider value={{user,loading,login,logout}}>{children}</AuthContext.Provider>
}
//export {  AuthProvider as default };