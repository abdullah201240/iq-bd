import dynamic from 'next/dynamic';
const AboutUsTitle = dynamic(() => import('@/components/AboutUsTitle'));

const Testimonial = dynamic(() => import('@/components/Testimonial'));
const AboutUsDescription = dynamic(() => import('@/components/AboutUsDescription'));
const WeOffer = dynamic(() => import('@/components/WeOffer'));

const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <div>

        
     
      
      <AboutUsTitle/>
      <AboutUsDescription/>
      <Testimonial />
      <WeOffer/>
     
      <Footer/>
    </div>
  );
}
