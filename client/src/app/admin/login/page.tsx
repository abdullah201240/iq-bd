import React from 'react';
import Image from 'next/image'; // Import Image from 'next/image'
import Logo from '@/app/assets/img/icon.webp';

export default function Page() {
  return (
    <div>
      <div className="w-screen min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="relative py-3 sm:max-w-xs sm:mx-auto">
          <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gblack rounded-xl shadow-lg">
            <div className="flex flex-col justify-center items-center h-full select-none">
              <div className="flex flex-col items-center justify-center gap-2 mb-8">
                <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                  <Image
                    src={Logo}
                    alt="Iq Logo"
                    width={32} // Fixed typo here
                    height={32} // Fixed typo here
                    className="w-8"
                  />
                </a>
                <p className="m-0 text-[16px] font-semibold text-black">Login to your Account</p>
                <span className="m-0 text-xs max-w-[90%] text-center text-black">
                  Get started with our app, just start section and enjoy the experience.
                </span>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-black">Username</label>
                <input
                  className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-black dark:bg-gblack"
                  placeholder="Username"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-xs text-black">Password</label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-black dark:bg-gblack"
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-5">
                <button className="py-1 px-8 bg-[#F17B21] text-black w-full  text-center text-base font-semibold shadow-md focus:outline-none ">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
