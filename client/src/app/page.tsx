import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

const Cart = dynamic(() => import('@/components/Cart'));
const HeroSection = dynamic(() => import('@/components/HeroSection'));
const AboutUs = dynamic(() => import('@/components/AboutUs'));
const WeOffer = dynamic(() => import('@/components/WeOffer'));
const Navbar = dynamic(() => import('@/components/Nabvar'));


export default function Home() {
  return (
    <div>
     
      <Navbar/>
      <HeroSection/>
      <AboutUs/>
      <WeOffer/>
      <Cart />
      <Footer/>
    </div>
  );
}
