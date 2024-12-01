"use client";

import dynamic from 'next/dynamic';

// AboutUsTitle and Footer are static, so we can import them normally
import ServicesTitle from '@/components/ServicesTitle';
import ServiceArea from '@/components/ServiceArea';

// Dynamically load other components that are not critical for initial rendering


const ContactForm = dynamic(() => import('@/components/ContactForm'), { 
  ssr: false, 
  loading: () => <div>Loading Description...</div> 
});


const ContactMap = dynamic(() => import('@/components/ContactMap'), { 
  ssr: false, 
});

export default function Home() {
  return (
    <div>
      {/* Static components */}
      <ServicesTitle 
       title="Contact Us"
       subTitle="Ready to bring your vision to life? Contact our architecture firm today! Visit our Contact Us page for inquiries and let’s create something amazing together."
      />
      <ServiceArea/>

      {/* Dynamically loaded components */}
      <ContactForm />
      <ContactMap/>
      <br></br>
     
    </div>
  );
}
