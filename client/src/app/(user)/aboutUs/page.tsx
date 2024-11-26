"use client";

import dynamic from 'next/dynamic';

// AboutUsTitle and Footer are static, so we can import them normally
import AboutUsTitle from '@/components/AboutUsTitle';

// Dynamically load other components that are not critical for initial rendering
const Testimonial = dynamic(() => import('@/components/Testimonial'), { 
  ssr: false, 
  loading: () => <div>Loading Testimonial...</div> 
});

const AboutUsDescription = dynamic(() => import('@/components/AboutUsDescription'), { 
  ssr: false, 
  loading: () => <div>Loading Description...</div> 
});


const TeamMember = dynamic(() => import('@/components/TeamMember'), { 
  ssr: false, 
  loading: () => <div>Loading TeamMember...</div> 
});

export default function Home() {
  return (
    <div>
      {/* Static components */}
      <AboutUsTitle />
      

      {/* Dynamically loaded components */}
      <AboutUsDescription />
      <Testimonial />
      <TeamMember/>
    </div>
  );
}
