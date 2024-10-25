"use client"
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({})

  useEffect(()=>{
    document.title = "Dashboard - Get Me A Chai"
    if(!session){
      router.push('/login');
    }
    else{
      getData()
    }
    console.log(session)
  }, [router, session])

  const getData = async() =>{
    let u = await fetchuser(session.user.name)
    setForm(u)
  }

  const handlechange = (e) =>{
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) =>{
    // e.preventDefault()
    let a = await updateProfile(e, session.user.name)
    toast('Profile updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
    
  return(
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
        <ToastContainer/>

      <h2 className='text-center font-bold text-2xl p-7 pb-4'>Welcome to your Dashboard</h2> 
      <form className="dashboard-form w-[65vw] md:w-[38vw] mx-auto" action={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input value={form.name? form.name: ""} onChange={handlechange} type="text" name="name" id="name" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input value={form.email? form.email: ""} onChange={handlechange} type="text" name="email" id="email" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input value={form.username? form.username: ""} onChange={handlechange} type="text" name="username" id="username" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-3">
          <label htmlFor="profilepic" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
          <input value={form.profilepic? form.profilepic: ""} onChange={handlechange} type="text" name="profilepic" id="profilepic" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-3">
          <label htmlFor="coverpic" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
          <input value={form.coverpic? form.coverpic: ""} onChange={handlechange} type="text" id="coverpic" name = "coverpic" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-3">
          <label htmlFor="razorpayid" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
          <input value={form.razorpayid? form.razorpayid: ""} onChange={handlechange} type="text" name="razorpayid" id="razorpayid" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-3">
          <label htmlFor="razorpaysecret" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
          <input value={form.razorpaysecret? form.razorpaysecret: ""} onChange={handlechange} type="text" name="razorpaysecret" id="razorpaysecret" className=" rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="my-6 mb-4">
            <button type="submit" className="relative w-full flex-1 p-1  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#253b6e] to-[#0d1526] group-hover:from-[#0d1526] group-hover:to-[#253b6e] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-[#3d5690]" >
              <div className="relative w-full px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Save
              </div>
            </button>
          </div>
      </form>
    </>
  );
};

export default Dashboard
