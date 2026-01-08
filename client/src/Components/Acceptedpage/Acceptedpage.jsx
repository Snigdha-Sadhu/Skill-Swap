import React, { useEffect, useState } from 'react'
import API from '../../API/api';
import socket from '../../socket';
const Acceptedpage = () => {
    const[Swaps,setSwaps]=useState([]);
    const [messageText,setMessageText]=useState({});
    const me=JSON.parse(localStorage.getItem("user"))
    console.log("ME OBJECT:", me)
    // load accepted swaps
  useEffect(() => {
    API.get("/match/accepted").then((res) => setSwaps(res.data));
  }, []);

  // join swap rooms
  useEffect(() => {
    Swaps.forEach((swap) => {
      socket.emit("joinSwap", swap._id);
    });
  }, [Swaps]);

  // receive messages
  useEffect(() => {
    socket.on("receiveMessage", ({ swapId, message }) => {
      setSwaps(prev =>
        prev.map(s =>
          s._id === swapId
            ? { ...s, messages: [...(s.messages || []), message] }
            : s
        )
      );
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = (swapId) => {
    const text = messageText[swapId];
    if (!text) return;

    socket.emit("sendMessage", { swapId, text });
    setMessageText(prev => ({ ...prev, [swapId]: "" }));
  };
  const markCompleted = async (id) => {
    await API.put(`/match/accepted/${id}`);
    setSwaps(prev =>
      prev.map(s =>
        s._id === id ? { ...s, status: "completed" } : s
      )
    );
  };
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
       My Skill Swaps
      </h1>
      {Swaps.length===0 && (
        <p className='text-center text-gray-500'>No acceptedSwaps Yet</p>
      )}
      <div className='grid gap-4 max-w-3xl  mx-auto'>{
        Swaps.map((swap)=>{
            const isSender=String(swap.sender._id)=== String(me.id);
            console.log("SENDER ID:", swap.sender.name);
             console.log("me ID:", me.id);
console.log("RECEIVER ID:", swap.receiver);
            const yougive=isSender ? swap.skillOffered:swap.skillRequested;
            const youlearn=isSender ? swap.skillRequested:swap.skillOffered
            const otherUser=isSender ? swap.receiver : swap.sender;
            return (
            <div className='bg-white p-5 rounded-xl shadow' key={swap._id}>
<h2 className='font-semibold text-lg'>Mathched with {otherUser.name}</h2>
<p className='text-gray-600'>
    you give:{yougive}
</p>
<p className='text-gray-600'>
    you learn:{youlearn}
</p>
<span className='inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full'>
    Accepted
</span>
{swap.status==="accepted" && (
  <button onClick={()=>markCompleted(swap._id)} className='mt-3 ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>Mark as Completed</button>
)}
{swap.status==="completed" && (
  <span  className='inline-block mt-2 px-3 text-sm bg-gray-200 text-gray-700 rounded-full'>Completed</span>
)}
{/*msg section*/}
       <div className='mt-4 border-t pt-3'>
<p className='text-sm font-semibold nb-2'>Contact & Message</p>
<div> 
  {swap.messages?.map((msg,i)=>{
    const isme=String(msg.sender)===String(me.id);
    return(
      <div key={i}className={`p-2 rounded-lg mb-2 max-w-[80%] ${isme
      ?"ml-auto bg-indigo-100 text-right" 
      :"mr-auto bg-gray-100 text-left"}`} >
    
      <p className='text-sm font-semibold'>
         {isme ? "you":otherUser.name}:

      </p>
<p>{msg.text}</p>

    </div>
  );
        })}
        </div>
       
       {/*input*/}
       <div className='flex gap-2 mt-2'>
        <input className='flex-1 border rounded px-2 py-1 text-sm'placeholder='Share email or phone' value={messageText[swap._id]||""}
        onChange={(e)=>setMessageText((prev)=>({
          ...prev,
          [swap._id]:e.target.value
        }))
        }
        />
        <button className='bg-indigo-600 text-white px-3 rounded text-sm ' onClick={()=>sendMessage(swap._id)}>
          Send
        </button>
        </div>
       </div>
</div>
        );
        })}

      </div>
    </div>
  )
}

export default Acceptedpage
