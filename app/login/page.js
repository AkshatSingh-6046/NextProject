"use client"
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import img from '/icons-svg/backGroundLogin.jpg'; 
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
//bg-[#0a0909]"
export default function Home() {
  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');
  const [toggle,setToggle] = useState(false);
  const [error, setError] = useState({});
  const resetForm = ()=>{
    setUser('');
    setPassword('');
    setToggle(false);
  }
  
  const submitForm = ()=>{
    let flag = false;
        if(user?.length==0){
          setError((prev)=>({...prev,user:'Username is required'}));
          flag = true;
        }
        if(user?.length<6){
          setError((prev)=>({...prev,user:'Username must be atleast 6 characters long'}));
          flag = true;
        }
        if(password?.length==0){
          setError((prev)=>({...prev,password:'Password is required'}));
          flag = true;
        }
        if(password?.length<8){
          setError((prev)=>({...prev,password:'Password must be atleast 8 characters long'}));
          flag = true;
        }
        if(flag) return;
        else alert(`User: ${user.toString()}`)
  }
  useEffect(()=>{
    setError({});
  },[user,password])
  return (
    <main className="relative flex min-h-screen flex-row justify-end" >
      <Image src={img} quality={50} layout="fill"/>
      <div className="flex rounded-lg shadow-[1px_1px_8px_1px_rgba(0,0,0,0.3)] flex-col mx-10 mt-10 h-[70vh] items-center w-2/5 backdrop-blur-lg bg-white/15 text-emerald-400">
        <div className="mt-6 mb-2 text-[32px] cursor-default">Login</div>
        <div className="p-2  w-3/4">
          <label
            htmlFor="input-group-1"
            className="flex flex-col pt-6 text-emerald-400"
          >
            Username
          </label>

          <div className="flex flex-col">
            <input
              type="text"
              id="input-group-2"
              value={user}
              onChange={(e)=>setUser(e.target.value)}
              className="mt-2 bg-transparent border-b-[1px] placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:border-b-2  border-emerald-400 text-black block flex-1 min-w-0 w-full text-md pb-1 pt-2"
              placeholder="Username"
            />
            {error?.user?<div className="flex items-center text-sm text-red-700">{error?.user}</div>:null}
          </div>

          <label
            htmlFor="input-group-2"
            className="flex flex-col pt-6 text-emerald-400"
            >
            Password
          </label>
          <div className="flex flex-col">

          <div className="flex">
            <input
              type={toggle?"text":"password"}
              id="input-group-2"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-2 bg-transparent border-b-[1px] placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:border-b-2  border-emerald-400 text-black block flex-1 min-w-0 w-full text-md pb-1 pt-2"
              placeholder="Password"
              />
            <div role="presentation" onClick={()=>setToggle(prev=>!prev)}className="absolute z-10 cursor-pointer left-[80%] mt-4 flex justify-center items-center ">{toggle?<AiFillEyeInvisible size={20} />:<AiFillEye size={20}/>}</div>
          </div>
          {error?.password?<div className="flex items-center text-sm text-red-700">{error?.password}</div>:null}
          </div>

        </div>
        <div className="flex w-4/5 mr-8 justify-end mt-4 text-gray-700 text-[12px]">Create new account &nbsp;<Link className="text-blue-800" href='/signup'>Signup</Link></div>
        
        <div className="flex w-3/4 pt-4 mt-6 align-center">
        <button type="button" role="presentation" onClick={resetForm} className="py-2 px-5 w-1/5 mr-2 mb-2 text-md font-medium hover:duration-300 text-gray-900 focus:outline-none hover:shadow-sm hover:shadow-gray-700/30 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-emerald-500 focus:z-10">Reset</button>

        <button type="button" role="presentation" onClick={submitForm} className="focus:outline-none text-white bg-emerald-500 hover:duration-300 hover:bg-emerald-800 hover:shadow-sm hover:shadow-green-900 focus:ring-emerald-300 font-medium rounded-lg text-md w-2/5 px-5 py-2 mr-2 mb-2">
          Submit
        </button>

        </div>
      </div>
    </main>
  );
}
