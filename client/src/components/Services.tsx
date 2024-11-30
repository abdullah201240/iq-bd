"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ServicesImg from '@/app/assets/img/ServicesImg.png' // Import the image
import Link from 'next/link';
// Define the type for a team member
interface Service {
    id: number; // Assuming each service has an id
    title: string;
    subTitle: string,
    logo: string;
}

export default function Services() {
  
    const [services, setServices] = useState<Service[]>([]); // To store fetched data

    // Fetch team members data from the API when the component mounts
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/servives`); // Replace with your API URL
                const data = await response.json();
                setServices(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeamMembers();
    }, []);

   

    return (
        <div
            style={{
                backgroundImage: `url(${ServicesImg.src})`, // Set ServicesImg as background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh', // Ensure the background covers the entire viewport
            }}

        >
            <div
                className="mx-auto max-w-[1330px]"

            >
                <br />
                <h1 className="text-5xl text-center text-white">Services</h1>
                <br />

                <p className="text-lg text-center text-white">&quot;Comprehensive Solutions for Every Interior Need&quot;</p>
                <div className="flex justify-center py-10 sm:pl-10 mx-auto max-w-[1330px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {services.map((member, index) => (
                            <div
                                key={index}
                                className="max-w-[270] overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-white pt-8 "
                                
                            >
                                <Image
                                    className="w-15 h-15 object-cover mx-auto" // Use mx-auto to center horizontally
                                    src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/${member.logo}`}
                                    alt={member.title}
                                    width={500}
                                    height={600}
                                />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2 text-center">{member.title}</div>
                                    <p className="text-gray-700 text-base">{member.subTitle}</p>
                                </div>

                                <Link href={`/services/${member.id}`}><p className='pl-6 pb-4 text-[#F17B21]'>Read More</p></Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
