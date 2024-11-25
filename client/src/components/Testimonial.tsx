import React from 'react';
import TestimonialCard from '@/components/TestimonialCard';

export default function Testimonial() {
  const testimonials = [
    {
        title:'title 1',
      image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
      name: 'Ahmed Rahman',
      rating: 5,
      text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa sit rerum incidunt.',
    },
    {
        title:'title 2',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80',
      name: 'Jane Doe',
      rating: 4,
      text: 'Lorem ipsum dolor sit amet consectetur. Culpa sit.',
    },
    // Add more testimonials here
  ];

  return (
    <section className="bg-[#FFCBA3]">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Change h4 to h2 for proper heading hierarchy */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-black sm:text-3xl">
          TESTIMONIALS
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard  key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
