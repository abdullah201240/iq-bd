import React from 'react';
import about from '@/app/assets/img/About.webp'; // Correctly imported image

export default function AboutUsTitle() {
    return (
        <div className="relative">
            {/* Background section */}
            <div
                className="flex flex-col items-start justify-center text-left px-8 py-20 lg:py-32 bg-cover bg-center "
                style={{
                    backgroundImage: `url(${about.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60vh',
                }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                
                {/* Content */}
                <div className="relative z-10 max-w-1xl px-2 sm:px-12 lg:px-80">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        About Us
                    </h2>
                    <p className="text-white text-base lg:text-lg leading-relaxed">
                        At the heart of our firm lies a commitment to exceptional green 
                        architecture and planning.<br/> We specialize in creating stunning 
                        interiors, landscapes, and decorations that elevate every space.
                    </p>
                </div>
            </div>
        </div>
    );
}
