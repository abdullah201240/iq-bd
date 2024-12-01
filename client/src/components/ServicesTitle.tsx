"use client";
import React from 'react'
import about from '@/app/assets/img/About.webp'; // Correctly imported image
// Define the props type for TypeScript
interface ServicesTitleProps {
    title: string;
    subTitle: string;
}
const ServicesTitle: React.FC<ServicesTitleProps> = ({ title, subTitle }) => {

    return (
        <div className="relative">
            {/* Background section */}
            <div
                 className="text-left  bg-cover bg-center min-h-[50vh]"
                style={{
                    backgroundImage: `url(${about.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '50vh',
                }}
            >
                {/* Semi-transparent overlay */}
                <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8 pt-36">
                    <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
                        <div className="text-left">

                            <h2
                                className="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-4xl">
                                {title}
                            </h2>
                            <br/>
                            <p className="text-white text-base lg:text-lg leading-relaxed">
                                {subTitle}

                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ServicesTitle;
