import {io} from "socket.io-client";
const socket=io("https://skill-swap-backend-7a5g.onrender.com",{
    withCredentials:true,
    autoConnect:true,
    /*extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }*/
 auth: {
    token: localStorage.getItem("token"),
  },
});
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket connect error:", err.message);
});
export default socket;