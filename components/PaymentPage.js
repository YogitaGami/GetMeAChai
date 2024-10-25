"use client";
import {React, useState, useEffect} from "react";
import Script from "next/script";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const PaymentPage = ({username}) => {
    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams()
    const router = useRouter()
    
  

    const handlechange= (e)=>{
        setPaymentform({...paymentform, [e.target.name]: e.target.value })
    }

   
    // const getData = async()=>{
    //   setIsLoading(true); // Set loading to true
    //   let u =await fetchuser(username)
    //   setcurrentUser(u)
    //   let dbpayments = await fetchpayments(username)
    //   setPayments(dbpayments)
    //   setIsLoading(false); // Set loading to false after fetching
    // }

    const getData = async () => {
      setIsLoading(true);
      try {
        let u = await fetchuser(username);
        setcurrentUser(u);
    
        let dbpayments = await fetchpayments(username);
        // console.log("Fetched payments:", dbpayments); // Log fetched payments
        // Check if it's an object, and wrap it in an array if necessary
        if (dbpayments && typeof dbpayments === 'object' && !Array.isArray(dbpayments)) {
          dbpayments = [dbpayments]; // Wrap the single object in an array
        }
        setPayments(dbpayments);
        // console.log("Payments state set:", dbpayments); // Log after setting state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    useEffect(() => {
      getData()
    }, [username])
    
    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }

    useEffect(() => {
      if(searchParams.get("paymentdone") == "true"){
      toast('Payment has been made', {
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
      router.push(`/${username}`)
    }, [])
    
    
    const pay = async (amount) =>{
        //  get the order id
        // console.log(session.user.name) 
        let a = await initiate(amount, username, paymentform)
        
        let orderId = a.id
        var options ={
          //  "key": process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
            "key": currentUser.razorpayid,
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
         
    }
  return (
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
        
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      

      <div className="cover relative">
        <Image
          // src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/189274/597dfbe8f6794b0789442ade14139866/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/12.jpg?token-time=1730678400&token-hash=Uy9W8kV6VyyutzEGMFkkQMOn1UsE9xSdpa1ZD3Bj5Ss%3D"
          src= {currentUser.coverpic}
          className="h-[200px] md:h-[400px]"
          alt="coverpic"
          width={2000}
          height={1000}
        />
        <div className="flex justify-center items-center">
          <Image
            className="artist w-[80px] md:w-[123px] absolute -bottom-15 rounded-lg"
            // src="/image/artist.jpg"
            // src= "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/189274/8ed012efa4144f42b5214a7d149cbc9b/eyJoIjoxMDgwLCJ3IjoxMDgwfQ%3D%3D/2.jpg?token-time=1730505600&token-hash=v-xzmBAz4aRXoF42QXzcqdLE3iXIUEiD2qFL1QGkygw%3D"
            src= {currentUser.profilepic}
            alt="artist"
            width={123}
            height={92}
          />
        </div>
      </div>
      <div className="info flex justify-center items-center flex-col gap-2">
        <div className="text-lg font-bold mt-20">@{username}</div>
        
        <div>Lets help {username} get a Chai</div>
        <div className="flex justify-center items-center">
          <span>{payments.length} Payments</span>
          <span className="m-1">|</span>
          <span>&#8377;{payments.reduce((a,b) => a + Number(b.amount), 0)} raised</span>
        </div>
      </div>

      <div className="payment flex justify-center items-center flex-col md:flex-row gap-3 gap-y-6 mx-auto mt-10">
        <div className="bg-[#18222f] w-[80%] md:w-[40%] min-h-[20vh] p-7 pt-10 rounded-md">
          <h3 className="font-bold text-xl">Top 10 Supports</h3>
          <ul className="donator ml-4 mt-4">
          {Array.isArray(payments) && payments.length > 0 ? (
            payments.map((p) =>{

            return <li key={p._id} className="d-1 flex items-center gap-1 mb-3">
              <Image
                className="person img pr-1"
                src={"/image/user-profile.png"}
                width={30}
                height={30}
              ></Image>
              <span>{p.name} donated <span className="font-bold">&#8377;{p.amount}</span> with a message &#34;{p.message}&#34;</span>
            </li>
          })): (
             <li>No payments have been made yet.</li>)}
          </ul>
        </div>
        <div className="makepayment bg-[#18222f] w-[80%] md:w-[40%] min-h-[20vh]  p-7 pt-10 rounded-md">
          <h3 className="font-bold text-xl">Make a Payment</h3>
          <form className="min-w-sm mt-4">
            <div className="flex my-2">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-[#00091d] dark:text-gray-400 dark:border-[#283b56]">
                <Image src={"/image/profile.png"} width={20} height={20} />
              </span>
              <input
                onChange={handlechange}
                value={paymentform.name}
                type="text"
                name="name"
                id="name"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1.5  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div className="flex my-2">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-[#00091d] dark:text-gray-400 dark:border-[#283b56]">
                <Image src={"/image/message.png"} width={20} height={20} />
              </span>
              <input
                onChange={handlechange}
                value= {paymentform.message}
                type="text"
                name="message"
                id="message"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1.5  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter message"
              />
            </div>
            <div className="flex my-2">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-[#00091d] dark:text-gray-400 dark:border-[#283b56]">
                <Image src={"/image/credit-card.png"} width={20} height={20} />
              </span>
              <input
                onChange={handlechange}
                value={paymentform.amount}
                type="text"
                name="amount"
                id="amount"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-1.5  dark:bg-[#1f2e43] dark:border-[#283b56] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter amount"
              />
            </div>
            <div className="my-3 mb-4">
              <button
                onClick={()=> pay(Number.parseInt(paymentform.amount)* 100)}
                type="button"
                className="relative w-full flex-1 p-1  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#253b6e] to-[#0d1526] group-hover:from-[#0d1526] group-hover:to-[#253b6e] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-[#3d5690] disabled:from-[#888d96]" disabled={paymentform.name?.length<2 || paymentform.message?.length<1 || paymentform.amount?.length<1}
              >
                <div className="relative w-full px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 disabled:bg-slate-400" >
                  Pay Now
                </div>
              </button>
            </div>
            <span className=" mr-2">
              <button
                type="button"
                className="w-fit rounded-lg bg-[#0d1526] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-6  focus:ring-[#253b6e] dark:bg-[#0d1526] dark:hover:bg-[#0f172a] dark:focus:ring-[#3d5690]"
                onClick={()=>pay(Number.parseInt(10)*100)}
              >
                Pay &#8377;10
              </button>
            </span>
            <span className=" mr-2">
              <button
                type="button"
                className="w-fit rounded-lg bg-[#0d1526] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-6  focus:ring-[#253b6e] dark:bg-[#0d1526] dark:hover:bg-[#0f172a] dark:focus:ring-[#3d5690]"
                onClick={()=>pay(Number.parseInt(4)*100)}
              >
                Pay &#8377;4
              </button>
            </span>
            <span className="">
              <button
                type="button"
                className="w-fite  rounded-lg bg-[#0d1526] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-6  focus:ring-[#253b6e] dark:bg-[#0d1526] dark:hover:bg-[#0f172a] dark:focus:ring-[#3d5690]"
                onClick={()=>pay(Number.parseInt(1)*100)}
              >
                Pay &#8377;1
              </button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
