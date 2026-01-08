import React, { useState } from 'react'
import API from'../../API/api';
import {useNavigate} from'react-router-dom';
const Profile = () => {
    const [skillsHave,setSkillsHave]=useState([{name:" ",level:"Beginner"}]);
    const [skillsWant,setSkillsWant]=useState([{name:" ",level:"Beginner"}]);
    const [bio,setBio]=useState(" ");
    const [availability,setAvailability]=useState(" ");
    const navigate=useNavigate();
    const addSkill=(setFn,skills)=>{
        setFn([...skills,{name:" ",level:"Beginner"}]);
    }
    const handleChange=(index,field,value,skills,setFn)=>{
        const updated=[...skills];
        updated[index][field]=value;
        setFn(updated);
    }
const submit=async(e)=>{

    e.preventDefault();
    alert("submitted");
    try{
        const res=await API.post('/auth/profile',{
          skillsHave,skillsWant,bio,availability
        });
      
        
        navigate('/dashboard');
    }catch(err){
const msg=(err.response?.data?.msg|| 'signup failed');
alert(msg);

    }
    };
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to pink-500 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-2xl p-4 mt-10 mb-20 w-full max-w-xl'>
      <p className='text-center text-gray-500 mb-6'>Tell us what you can teach and what you want to learn</p>
      <form onSubmit={submit}>
      <section className='mb-4'>
        <h2 className='font-semibold text-gray-700 mb-2'>Skills I Have</h2>
        {skillsHave.map((skill,index) => (
            <div key={index} className='flex gap-3 mb-2'>
                <input placeholder="Skill name"type="text" className='flex-1 border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400' value={skill.name} onChange={(e)=> handleChange(index,"name",e.target.value,skillsHave,setSkillsHave)}>
                </input>
                <select className='border rounded-lg px-3 py-2' value={skill.level} onChange={(e)=>handleChange(index,"level",e.target.value,skillsHave,setSkillsHave)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
                </select>

            </div>
        ))}
        <button  type=" button "onClick={(e)=>{e.preventDefault();addSkill(setSkillsHave,skillsHave)} }className='text-indigo-600 text-sm font-semibold'>
+ Add another skill
        </button>
      </section>
      {/*skill i want*/}
      <section className='mb-4'>
        <h2 className='font-semibold text-gray-700 mb-2'>Skills I Want to Learn</h2>
        {skillsWant.map((skill,index) => (
            <div key={index} className='flex gap-3 mb-2'>
                <input type="text" placeholder='  Skill name' className='flex-1 border rounded-lg pk-3 py-2 text-gray-800 placeholder-gray-400' value={skill.name} onChange={(e)=> handleChange(index,"name",e.target.value,skillsWant,setSkillsWant)}>
                </input>
                <select className='border rounded-lg px-3 py-2' value={skill.level} onChange={(e)=>handleChange(index,"level",e.target.value,skillsWant,setSkillsWant)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Expert</option>
                </select>

            </div>
        ))}
        <button type="button" onClick={(e)=>{ e.preventDefault();addSkill(setSkillsWant,skillsWant)}}className='text-indigo-600 text-sm font-semibold'>
+ Add another skill
        </button>
      </section>
      {/*bio*/}
      <section className='mb-4'>
        <h2 className='font-semibold text-gray-700 mb-2'>Bio</h2>
        <textarea rows="3" placeholder='write a short bio about yourself..' className='w-full border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400' value={bio} onChange={(e)=>setBio(e.target.value)}/>
      </section>
      {/*Availability*/}
      <section className='mb-4'>
        <h2 className='font-semibold text-gray-700 mb-2'>Availability</h2><input type="text" placeholder='e.g. Weekends,Evenings'
      className='w-full border rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400' value={availability} onChange={(e)=>setAvailability(e.target.value)}/>
      </section>
      <button className='w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition' type="submit">Save Profile</button>
      </form>
    </div>
    </div>
  )
}

export default Profile
