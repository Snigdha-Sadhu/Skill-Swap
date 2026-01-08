import React from 'react'
import { useState,useEffect } from 'react';
import API from '../../API/api';
const History = () => {
    const me=JSON.parse(localStorage.getItem("user"))
    const[history,setHistory]=useState([]);
     useEffect(() => {
    API.get("/match/history").then((res) => {
        setHistory(res.data), console.log("history",res.data)
     });
   
  }, []);
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
My Swap History
      </h1>
      {history.length===0?(
        <p className='text-center text-gray-500'>No swaps yet</p>
      ):(
        <div className='max-w-3xl mx-auto space-y-4'>
            {history.map((swap)=>{
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
<p className='mt-2'>
Status:{' '}
<span className={`inline-block px-3 py-1 rounded-full text-sm ${
    swap.status==="completed"
    ? 'bg-green-100 text-green-700'
    :swap.status==="accepted"
    ? 'bg-blue-100 text-blue-700'
    : 'bg-gray-100 text-gray-700'
}`}>
    {swap.status.charAt(0).toUpperCase()+swap.status.slice(1)}
</span>
</p>
{swap.messages?.length >0 && (
    <div className='mt-3 p-3 bg-gray-50 rounded border'>
<strong>Last messages:</strong>{' '}
    {swap.messages[swap.messages.length-1].text}

    </div>
)}
</div>
);
            })}
        </div>
      )}
    </div>
  )
}

export default History
