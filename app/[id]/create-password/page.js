"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Oval as Loader } from "react-loader-spinner";
import Image from "next/image";
import img from "/icons-svg/backGroundLogin.jpg";
import useGetOnboardUser from "@/components/hooks/getOnboardUser";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//bg-[#0a0909]"
export default function Home() {
  const router = useRouter();
  const { id: user_id } = useParams();
  const { data, loading, getOnboardApi } = useGetOnboardUser();

  const [toggle, setToggle] = useState(false);
  const [password, setPassword] = useState({ pass1: "", pass2: "" });
  const [error, setError] = useState({});
  const submitForm = async () => {
    if (password?.pass1?.length === 0)
      setError({ password: "Password is Required" });
    else if (password?.pass2?.length === 0)
      setError({ password: "Confirmation Password is Required" });
    else if (password?.pass1?.length < 8)
      setError({ password: "Password must be atleast 8 characters long" });
    else if (password?.pass1 !== password?.pass2)
      setError({ password: "Passwords do not match" });
    else {
      await getOnboardApi({
        data: { user_id, password: password.pass1 },
        endPoint: "post_change_password",
      });
      setPassword({ pass1: "", pass2: "" });
      setTimeout(() => {
        router.push("/login");
      }, 4000);
      return toast.success(
        <div>
          <div>Password Changed!</div> Redirecting to Login Page
        </div>,
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        }
      );
    }
  };

  useEffect(() => {
    setError({});
  }, [JSON.stringify(password)]);

  return (
    <main className="relative flex min-h-screen flex-row justify-end">
      <ToastContainer />
      <Image src={img} quality={50} layout="fill" />
      <div className="flex rounded-lg shadow-[1px_1px_8px_1px_rgba(0,0,0,0.3)] flex-col mx-10 mt-10 h-[80vh] items-center w-2/5 backdrop-blur-lg bg-white/15 text-emerald-400">
        <div className="mt-6 mb-2 text-[32px] cursor-default">
          Create New Password
        </div>
        {loading ? (
          <Loader
            height={60}
            width={60}
            color="#34d399"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#24815f"
            strokeWidth={3}
            strokeWidthSecondary={3}
          />
        ) : (
          <div className="p-2  w-3/4">
            <label
              htmlFor="input-group-1"
              className="flex flex-col pt-6 text-emerald-400"
            >
              New Password
            </label>

            <div className="flex flex-col">
              <input
                type={toggle ? "text" : "password"}
                id="input-group-1"
                value={password?.pass1}
                onChange={(e) =>
                  setPassword((p) => ({ ...p, pass1: e.target.value }))
                }
                className="mt-2 bg-transparent border-b-[1px] placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:border-b-2  border-emerald-400 text-black block flex-1 min-w-0 w-full text-md pb-1 pt-2"
                placeholder="Enter Password"
              />
              <div
                role="presentation"
                onClick={() => setToggle((prev) => !prev)}
                className="absolute z-10 cursor-pointer left-[80%] mt-4 flex justify-center items-center "
              >
                {toggle ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
            <label
              htmlFor="input-group-2"
              className="flex flex-col pt-6 text-emerald-400"
            >
              Confirm Password
            </label>

            <div className="flex flex-col">
              <input
                type="password"
                id="input-group-2"
                value={password?.pass2}
                onChange={(e) =>
                  setPassword((p) => ({ ...p, pass2: e.target.value }))
                }
                className="mt-2 bg-transparent border-b-[1px] placeholder-slate-500 focus:outline-none focus:border-emerald-600 focus:border-b-2  border-emerald-400 text-black block flex-1 min-w-0 w-full text-md pb-1 pt-2"
                placeholder="Re-enter password"
              />
            </div>

            {error?.password ? (
              <div className="flex items-center text-sm text-red-700">
                {error?.password}
              </div>
            ) : null}
          </div>
        )}
        <div className="flex w-full pt-4 mt-6 align-center justify-center">
          <button
            type="button"
            role="presentation"
            onClick={submitForm}
            className="focus:outline-none text-white bg-emerald-500 hover:duration-300 hover:bg-emerald-800 hover:shadow-sm hover:shadow-green-900 focus:ring-emerald-300 font-medium rounded-lg text-md w-2/5 px-5 py-2 mr-2 mb-2"
          >
            Change Password
          </button>
        </div>
      </div>
    </main>
  );
}
