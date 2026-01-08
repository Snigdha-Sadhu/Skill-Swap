import { useEffect,useState } from "react";
import API from "../../API/api"
import React from 'react'


const Receivedpage = () => {
    const [requests,setRequests]=useState([]);
    const[loading,setLoading]=useState(true);
   

    const fetchRequests=async()=>{
        try{
            console.log("FETCHING REQUESTS...");
        const res= await API.get("/match/received")
        setRequests(res.data)
        console.log("FETCHED DATA:", res.data);
        }
        catch(err){
            console.error(err)
        }
        finally{setLoading(false)};
    }
useEffect(()=>{
    fetchRequests();
},[]);
    const handleAction=async(id,status)=>{
        try {
            await API.patch(`/match/request/${id}`,{status});
           fetchRequests();
           console.log("PATCH DONE");
        } catch (err) {
            alert("Action failed")
        }
        }
    if(loading){
        return(
<div className="min-h-screen flex items-center justify-center">
    Loading requests...
</div>
        );
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
        <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-white mb-6">
           Swap Requests Received
      </h1>
      {requests.length===0 ? (
        <p>
            No request yet
        </p>
      ):(
        requests.map(req=>(
            <div key={req._id} className="bg-white p-5 rounded-xl shadow mb-4 flex justify-between">
<div>
    <p className="font-semibold">{req.sender.name}</p>
    <p>Offers:{req.skillOffered}</p>
    <p>wants:{req.skillRequested}</p>

</div>
<div className="flex gap-2">
    {req.status==="pending" ?(
        <>
<button className="bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:to-green-700 px-4 py-1 text-white rounded" onClick={()=>handleAction(req._id,"accepted")}>Accept</button>
<button className="bg-gradient-to-br from-red-400 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:to-orange-700 px-4 py-1 text-white rounded" onClick={()=>handleAction(req._id,"rejected")}>Reject</button>
</>
    ):(
        <span className="text-sm font-semibold text-gray-600">
Status:{req.status}
        </span>
    )}
</div>
</div>
        ))
      )}
    </div>
    </div>
  )
}

export default Receivedpage
