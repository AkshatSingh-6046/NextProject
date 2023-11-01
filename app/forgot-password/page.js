"use client"
import React,{ useRef } from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import img from '/icons-svg/backGroundLogin.jpg'; 

//bg-[#0a0909]"
export default function Home() {
  const [user,setUser] = useState('');
  const [showOTP,setShowOTP] = useState(false);
  const [OTP,setOTP] = useState(['','','','']);
  const refs = useRef([]);

  const [error, setError] = useState({});
  const checkEmail = ()=>{
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regEmail.test(user);
  }
  const emptyBackspace = (e,i)=>{

    if(e.key==='Backspace')
        if(i>0&&refs.current[i].value.length===0) refs.current[i-1].focus();
    
  }
  const submitForm = ()=>{
    if(showOTP){
        return;
    }
        if(user?.length==0) setError((prev)=>({...prev,user:'Email is Required'}))
        else if(checkEmail()) setError((prev)=>({...prev,user:'Email is Invalid'}))
        else setShowOTP(true);
  }
  const setOTPblocks = (e,i)=>{

    if(Number(refs.current[i].value)>=10){
        
        console.log(e.target.value, i, 'pppppp')
        const val = Number(refs.current[i].value);
        refs.current[i].value = parseInt(refs.current[i].value = val / 10);
        if(i<3) refs.current[i+1].value = val % 10;
        
        i<3 ? refs.current[i+1].focus():refs?.current[i]?.focus();
        
    }
    refs.current.forEach((refItem,i)=>{
        setOTP((prev)=>{
            let newArr = prev;
            newArr[i]=refItem.value;
            return newArr;
        })
    })
  }
  useEffect(()=>{
    setError({});
  },[user])
  useEffect(()=>{
        OTP?.forEach((num,i)=>{
            if(num?.length===1){
                i<3?refs?.current[i+1]?.focus():refs?.current[i]?.focus();
            }
        })
  },[OTP])
  return (
    <main className="relative flex min-h-screen flex-row justify-end" >
      <Image src={img} quality={50} layout="fill"/>
      <div className="flex rounded-lg shadow-[1px_1px_8px_1px_rgba(0,0,0,0.3)] flex-col mx-10 mt-10 h-[80vh] items-center w-2/5 backdrop-blur-lg bg-white/15 text-emerald-400">
        <div className="mt-6 mb-2 text-[32px] cursor-default">Forgot Password</div>
        <div className="flex w-4/5 mr-8 justify-end text-gray-700 text-[12px]">Go to&nbsp;<Link className="text-blue-800" href='/login'>Login</Link>&nbsp;Page</div>
        
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
              id="input-group-1"
              value={user}
              onChange={(e)=>setUser(e.target.value)}
              className="mt-2 bg-transparent border-b-[1px] placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:border-b-2  border-emerald-400 text-black block flex-1 min-w-0 w-full text-md pb-1 pt-2"
              placeholder="Username"
            />
            {error?.user?<div className="flex items-center text-sm text-red-700">{error?.user}</div>:null}
          </div>


        </div>  
        {showOTP?<>
            <label
            htmlFor="otp-group-1"
            className="flex pt-10 pb-2 text-emerald-400"
          >
            Enter OTP
          </label>
        <div className="flex flex-col w-3/4 justify-around">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {
                    [0,1,2,3].map((num)=>{
                                return  <div key={num} className="w-16 h-16 ">
                                <input ref={(element) => refs.current[num]=element} onKeyDown={(e)=>emptyBackspace(e,num)} onChange={e=>setOTPblocks(e,num)} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-emerald-600 appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" name={`otp-group-${num+1}`} id={`otp-group-${num+1}`}/>
                              </div>
                    })
                }
            </div>
        </div>
        </>
             : null
        }
        <div className="flex w-3/4 pt-4 mt-6 align-center justify-center">
        <button type="button" role="presentation" onClick={submitForm} className="focus:outline-none text-white bg-emerald-500 hover:duration-300 hover:bg-emerald-800 hover:shadow-sm hover:shadow-green-900 focus:ring-emerald-300 font-medium rounded-lg text-md w-2/5 px-5 py-2 mr-2 mb-2">
          {!showOTP?'Send OTP':'Verify'}
        </button>
        
        </div>
      </div>
    </main>
  );
}
