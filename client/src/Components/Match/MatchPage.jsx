import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import API from '../../API/api';
import { useNavigate } from 'react-router-dom';
const MatchPage = () => {
    const[matches,setMatches]=useState([]);
    const[selectedOffer,setSelectedOffer]=useState({});
     const[selectedRequest,setSelectedRequest]=useState({});

    const [loading ,setLoading]=useState(true);
    const [me,setMe]=useState(null)
    const navigate=useNavigate();
    useEffect(()=>{
        API.get("/match")

        .then(res=>{
          console.log(res.data)
          setMatches(res.data)
    })
        .catch(err=>console.error(err))
        .finally(()=>setLoading(false));
    }
    ,[])
    useEffect(()=>{
      API.get('/auth/me')
      .then(res=>setMe(res.data))
      .catch(err=>console.log(err));
    },[])
const handleswap=async(matchedUser)=>{
//e.preventDefault();
   
    try{
    const offer=selectedOffer[matchedUser._id];
    const request=selectedRequest[matchedUser._id];
    if(!offer || !request){
      alert("please select skills before requesting");
      return;
    }
      if(!me || !me.skillsHave?.length||!matchedUser.skillsHave?.length){
        alert('Skills not available');
        return;
      }
    const payload={
      receiver:matchedUser._id,
      skillOffered:offer,
      skillRequested:request
    }
        const res=await API.post('/match/request',payload);
       console.log(res.data);
       alert('swap request sent successfully');
       navigate('/dashboard')
}catch(err){
 alert(err.response?.data?.msg || 'Error');
}
}
    if(loading){
      return (
        <div className='min-h-screen flex items-center justify-center text-lg font-semibold'> Finding skill matches for you</div>
      )
    }

  return (
    <div className='min-h-screen flex items-center justify-center text-lg font-semibold'>
        <div className='max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold text-white mb-2'>
        People who can teach you
      </h2>
      {matches.length===0 ? (
        <div className='bg-white rounded-xl p-6 text-center shadow-lg'>
        <p className='text-gray-600'>
            No matches found now 
            Try updating your skills
        </p>
        <button onClick={()=>navigate("/profile")} className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>
            Edit Profile
        </button>
        </div>
      ):(
        <div className='grid sm:grid-cols-2 lg-grid-cols-3 gap-6'>
      {matches.map((user)=>(
       
       <div key={user._id} className='bg-white rounded-2xl shadow-xl p-5 hover:scale-[1.02] transition'>
            {/*header*/}
            <div className='flex items-center gap-3 mb-3'>
            <div className='w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold'>{user.name?.charAt(0).toUpperCase()}</div>
            <div>
                <h2 className='font-semibold text-gray-800'> {user.name}</h2>
             <p className='text-sm'>
                        Availability:{user.availability||"Not specified"}
                    </p>
               </div>
               </div>
               <div className='mb-4'>
               
               {/* Select skill you offer */}
<select
  className="w-full mb-2 p-2 border rounded"
  onChange={(e) =>
    setSelectedOffer({ ...selectedOffer, [user._id]: e.target.value })
  }
>
  <option value="">Select skill you offer</option>
  {me?.skillsHave?.map((skill, idx) => (
    <option key={idx} value={skill.name}>
      {skill.name}
    </option>
  ))}
</select>

{/* Select skill you want */}
<select
  className="w-full mb-2 p-2 border rounded"
  onChange={(e) =>
    setSelectedRequest({ ...selectedRequest, [user._id]: e.target.value })
  }
>
  <option value="">Select skill you want</option>
  {user.skillsHave.map((skill, idx) => (
    <option key={idx} value={skill.name}>
      {skill.name}
    </option>
  ))}
</select>

      </div>
                <button className='mt-2 px-4 py-1 bg-indigo-600 text-white rounded' onClick={()=>handleswap(user)}

                >
               Request Swap
                </button>
            
            </div>
      ))}
    </div>
    )}
    </div>
    </div>
  );
};

export default MatchPage
