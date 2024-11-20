import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

const Cart = dynamic(() => import('@/components/Cart'));
const HeroSection = dynamic(() => import('@/components/HeroSection'));
const AboutUs = dynamic(() => import('@/components/AboutUs'));
const WeOffer = dynamic(() => import('@/components/WeOffer'));


export default function Home() {
  return (
    <div>
     
      
      <HeroSection/>
      <AboutUs/>
      <WeOffer/>
      <Cart />
      <Footer/>
    </div>
  );
}
