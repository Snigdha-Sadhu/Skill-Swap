import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  NotificationProvider  from "./Context/Notificationcontext";
import {BrowserRouter,Routes,Route,Navigate} from'react-router-dom'

createRoot(document.getElementById('root')).render(
//  <StrictMode>
<BrowserRouter>
<NotificationProvider>
    <App />
   </NotificationProvider>
   </BrowserRouter>
  //</StrictMode>,
)
