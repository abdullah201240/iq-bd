"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ServicesTitle from '@/components/ServicesTitle';
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { FaSpinner } from 'react-icons/fa';

interface ProjectImage {
    id: number;
    imageName: string;
}

export default function Page() {
    const [images, setImages] = useState<ProjectImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/project`);
                if (!response.ok) {
                    throw new Error("Failed to fetch project images");
                }

                const result = await response.json();
                setImages(result.data); // Assuming API returns { message, data }
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <ServicesTitle
                title="Gallery"
                subTitle="Browse our gallery to experience the art of architecture! Check out our diverse projects that highlight our commitment to design excellence and creativity."
            />
            
            <div className="max-w-screen-xl mx-auto p-6 sm:p-10 md:p-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <FaSpinner className="animate-spin text-primary text-4xl" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {images.map((story, index) => (
                            <div key={index} className="group rounded-lg overflow-hidden shadow-xl bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                                <div className="relative w-full h-64">
                                    <Image
                                        className="object-contain w-full h-full group-hover:opacity-80 transition-opacity duration-300"
                                        src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}/upload/${story.imageName}`}
                                        alt={story.imageName || 'Project Image'}
                                        layout="fill" // Makes image fill the parent container
                                        objectFit="contain" // Ensures image is not cropped
                                    />
                                </div>
                                
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
