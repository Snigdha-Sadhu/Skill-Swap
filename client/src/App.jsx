import Dashboard from './Pages/Dashboard';
import {BrowserRouter,Routes,Route,Navigate} from'react-router-dom'
import socket from './socket';
 import {AuthContext, AuthProvider} from'./Context/AuthContext'
import Login from'./Components/Auth/Login'
import Signup from'./Components/Auth/Signup';
import Front from './Pages/Front';
import { useEffect } from 'react';
import Profile from './Components/Profile/Profile';
import { useContext } from 'react';
import MatchPage from './Components/Match/MatchPage';
import Receivedpage from './Components/Receivedpage/Receivedpage';
import Acceptedpage from './Components/Acceptedpage/Acceptedpage';
import History from './Components/History/History';
//import { NotificationProvider } from "./Context/Notificationcontext";
import NotificationPage from './Components/notification/NotificationPage';



function PrivateRoute({children}){
  const {user}=useContext(AuthContext);
  return user? children :<Navigate to ="/login"/>
}
function AppRoutes(){
  const {user}=useContext(AuthContext);
   

  return(
    
      <Routes>
        <Route path="/" element={user ? <Navigate to ="/dashboard"/> :<Navigate to=
          
          "/front"/>}/>
          <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/front" element={<Front/>}></Route>
            <Route path="/profile" element={
               <PrivateRoute><Profile/></PrivateRoute>
               }>

               </Route>
             <Route path="/received" element={<PrivateRoute><Receivedpage/></PrivateRoute>}></Route>
             <Route path="/accepted" element={<PrivateRoute><Acceptedpage/></PrivateRoute>}></Route>
             <Route path="/match" element={
             <PrivateRoute><MatchPage/></PrivateRoute> }></Route>
              <Route path="/history" element={
               <PrivateRoute>
                <History/>
                </PrivateRoute> 
               }>
                
               </Route>
               <Route path="/notifications" element={
                <PrivateRoute>
                <NotificationPage/>
                </PrivateRoute>
                }>

                </Route>
              
          <Route path="/dashboard" element={
            <PrivateRoute>
            <Dashboard/>
             </PrivateRoute>
            }></Route>
          
      </Routes>
      
  )
}
function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>

  
  );
}

export default App;
