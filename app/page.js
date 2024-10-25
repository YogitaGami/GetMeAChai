import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mycontainer-1 py-20 h-[330px]">
        <div className="flex gap-2 md:gap-3 justify-center items-center">
          <h1 className="font-bold text-3xl sm:text-4xl m-2 sm:m-4">
            Get Me a Chai
          </h1>
          <Image className="cup_image m-2 sm:m-4 size-9 sm:size-12" src="/image/teaCup.png" alt="tea" width={43} height={3}/>
        </div>
        <p className="text-center mb-2 px-1">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <p className="text-center px-1">
          A place where your fans can buy you a chai. Unleash the power of your
          fans and get your project funded.
        </p>
        <div className="main-btn flex justify-center items-center gap-1 sm:gap-2 my-3">
          <Link href={"/login"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-3 sm:px-5 py-1.5 sm:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start Here
              </span>
            </button>
          </Link>
          <Link href={"/about"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-3 sm:px-5 py-1.5 sm:py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Read More
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-slate-600 h-1 opacity-25"> </div>
      <div className="mycontainer-2 m-3 md:m-12 ">
        <h2 className="text-center font-bold text-2xl mb-8 md:mb-0">
          Your Fans can buy you a Chai
        </h2>
        <div className="flex justify-center gap-6 md:gap-28 flex-col md:flex-row m-3 md:m-10">
          <div className="flex justify-center flex-col items-center">
            <div className="bg-gray-600 rounded-full size-14 relative">
              <Image className="size-10 absolute left-2 top-2" src="/image/fanWithComp.png" alt="" width={23} height={7}></Image>
            </div>
            <p className="font-bold my-3">
              Fans want to Help
            </p>
            <p>Your fans are available for support you</p>
          </div>
          <div className="flex justify-center flex-col items-center">
            <div className="bg-gray-600 rounded-full size-14 relative">
              <Image className="size-10 absolute left-2 top-2" src="/image/dollar.png" alt="" width={23} height={5}></Image>
            </div>
            <p className="font-bold my-3">
              Fans want to Contribute
            </p>
            <p>Your fans are willing to contribute financially</p>
          </div>
          <div className="flex justify-center flex-col items-center">
          <div className="bg-gray-600 rounded-full size-14 relative">
              <Image className="size-10 absolute left-2 top-2" src="/image/people.png" alt="" width={23} height={5}></Image>
            </div>
            <p className="font-bold my-3">
              Fans want to Collaborate
            </p>
            <p>Your fans are ready to Collaborate with you</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-600 h-1 opacity-25"> </div>
      <div className="mycontainer-3 m-6 md:m-12 mb-0">
        <h2 className="text-center font-bold text-2xl">
          Learn more about Us
        </h2>
        <div className="flex justify-center items-center mt-10 pb-6 md:pb-24">
          <iframe className=" w-[250px] sm:w-[450px] md:w-[560px] h-[150px] sm:h-[220px] md:h-[315px]" width="560" height="315" src="https://www.youtube.com/embed/DFxQ9Rr9GeM?si=nP47QM1WyYSqBiPE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
