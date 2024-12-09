import React from "react";
import Image from "next/image";
import Exp from "@/app/assets/img/Exp.webp"
import Img from "@/app/assets/img/image19.webp"
import map from "@/app/assets/img/map-pin.webp"


export default function JobList() {
  const jobList = [
    {
      title: "Frontend Developer",
      location: "IQ Architects Ltd, House- 141 (4A, Lane- 01, Dhaka 1206",
      experience: "2-3 Years",
      salary: "$60,000 - $80,000",
      applyEndDate: "December 31, 2024",
    },
    {
      title: "Backend Engineer",
      location: "IQ Architects Ltd, House- 141 (4A, Lane- 01, Dhaka 1206",
      experience: "3-5 Years",
      salary: "$90,000 - $110,000",
      applyEndDate: "January 15, 2025",
    },
    {
      title: "UI/UX Designer",
      location: "IQ Architects Ltd, House- 141 (4A, Lane- 01, Dhaka 1206",
      experience: "1-2 Years",
      salary: "$40,000 - $60,000",
      applyEndDate: "December 20, 2024",
    },
  ];

  return (
    <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 bg-white">
      <div className="mr-auto place-self-center w-full">
        <h1 className="max-w-4xl mb-4 text-3xl font-extrabold leading-none tracking-tight text-black md:text-4xl">
          Current Job Openings 🚀
        </h1>

        <p className="max-w-full mb-6 text-lg font-light text-gray-600 lg:mb-8 md:text-lg lg:text-base">
          Explore our current openings below. If you&apos;re driven, skilled, and ready to make a difference, we’d love to hear from you!
        </p>

        <div className="bg-white rounded-lg w-full">
          {jobList.length > 0 ? (
            jobList.map((job, index) => (
              <div
                key={index}
                className="bg-[#F7F7FF] p-6 w-full mx-auto rounded-lg shadow-md flex justify-between items-center mb-6 hover:shadow-lg transition-shadow"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">

                    {job.title}
                  </h2>
                  <div className="flex items-center mt-2 text-gray-600 text-sm space-x-4">
                    <span className="flex items-center">
                     <Image
                     src={map}
                     alt="map"
                     width={30}
                     height={30}
                     
                     
                     />
                      <span className="ml-2 text-lg">{job.location}</span>
                      </span>
                    <span className="flex items-center">
                    <Image
                     src={Exp}
                     alt="exp"
                     width={30}
                     height={30}
                     
                     
                     />
                     <span className="ml-2 text-lg">{job.experience}</span>
                      
                    </span>
                    <span className="flex items-center">
                    <Image
                     src={Img}
                     alt="Img"
                     width={30}
                     height={30}
                     
                     
                     />
                      <span className="ml-2 text-lg ">{job.salary}</span>
                      </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">
                    Apply By: <span className="font-medium">{job.applyEndDate}</span>
                  </p>
                  <button className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                    View & Apply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No job openings available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
