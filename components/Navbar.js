"use client";
import { React, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false);
  const { data: session } = useSession();
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <nav className="w-full bg-[#00091d] py-2 px-2 md:px-7 sm:px-4 ">
      <div className="flex justify-between">
        <div>
          <Link href={"/"} className="flex justify-center items-center">
            <Image
              className="cup_image m-1 sm:m-2 size-6 sm:size-8"
              src="/image/teaCup.png"
              alt=""
              width={23}
              height={3}
            ></Image>
            <div className="text-white font-bold text-[17px] sm:text-[20px]">
              Get Me a Chai
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-4 md:gap-5 font-bold text-white">
          {session && (
            <>
              <button
                onClick={() => setShowdropdown(!showdropdown)}
                // onBlur={()=> {setTimeout(() => {
                //   setShowdropdown(false)
                // }, 100);}}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-1 sm:px-3 py-1 sm:py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Account
                </span>
                <svg
                  className="w-2 sm:w-2.5 h-2 sm:h-2.5 ms-1 sm:ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* <!-- Dropdown menu --> */}
              <div
                id="dropdown"
                className={`z-10 ${
                  showdropdown ? "" : "hidden"
                } absolute top-[8vh] bg-white divide-y divide-gray-100 rounded-lg shadow w-[20vh] dark:bg-[#4e71f3]`}
              >
                <ul
                  className="py-2 text-[12px] sm:text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-[#6d54ef] dark:hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-[#6d54ef] dark:hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-[#6d54ef] dark:hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Earnings
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
          {/* {session && (
            <Link href={"/dashboard"}>
              <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Dashboard
                </span>
              </button>
            </Link>
          )} */}
          {session && (
            <Link href={"/logout"}>
              <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-1 sm:px-3 py-1 sm:py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {" "}
                  {/* onClick={()=>{signOut()}} */}
                  Logout
                </span>
              </button>
            </Link>
          )}
          {!session && (
            <Link href={"/login"}>
              <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-1 sm:px-3 py-1 sm:py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
