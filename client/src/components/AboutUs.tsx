"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import AboutImg from "@/app/assets/img/About.png";
import Back from '@/app/assets/img/aboutbg.webp';

export default function AboutUs() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div
      className="bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${Back.src})` }} // Set the background image
    >
      <div className="sm:flex items-center max-w-screen-xl mx-auto bg-white bg-opacity-90 rounded-xl">
        {/* Left Content */}
        <div className="sm:w-1/2 p-5 sm:p-10 text-center sm:text-left">
          <span className="text-black mt-4 text-4xl">
            IQ Architects Ltd is the best interior design solutions
          </span>

          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Step into IQ Architects Ltd, an oasis of innovative and sustainable
            architectural designs since 2014. As a premier Interior Design
            Company situated in Bangladesh, we have forged our path to
            excellence. Our team, composed of adept architects and designers,
            is committed to crafting remarkable creations that resonate with our
            clients. Rooted in the principles of Idea, Innovation, and
            Inspiration, we dedicate ourselves to bringing your visions to
            life. Specializing in both residential and commercial architecture,
            we offer avant-garde solutions for interior Design and exterior
            design projects.
          </p>

          <div className="mt-6">
            <button className="bg-white dark:bg-white text-black dark:text-black border-2 border-black 
    hover:border-[#f17b21] dark:hover:border-[#f17b21] 
    hover:bg-[#f17b21] dark:hover:bg-[#f17b21] 
    hover:text-white dark:hover:text-white 
    transition-all duration-300 ease-in-out transform hover:scale-105 px-6 py-2 rounded-full">
              Read More
            </button>
          </div>


        </div>

        {/* Right Image with Play Icon */}
        <div className="sm:w-1/2 p-5 sm:p-10 flex justify-center relative">
          <div className="relative w-full h-80 sm:h-[400px] md:h-[500px]">
            <Image
              src={AboutImg}
              alt="IQ Architects"
              className="rounded-xl"
              style={{ objectFit: 'cover' }} // Apply objectFit for proper scaling
              fill // Ensures the image fills the container
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw" // This sets the image size based on viewport width
            />

            {/* Play Icon */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsVideoOpen(true)}
            >
              <div className="bg-black bg-opacity-50 text-white w-16 h-16 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.25v13.5L18 12 5.25 5.25z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/XO8wew38VM8?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
