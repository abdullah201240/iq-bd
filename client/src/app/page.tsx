import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('@/components/Cart'));
const HeroSection = dynamic(() => import('@/components/HeroSection'));
const AboutUs = dynamic(() => import('@/components/AboutUs'));
const WeOffer = dynamic(() => import('@/components/WeOffer'));
const Footer = dynamic(() => import('@/components/Footer'));
const Navbar = dynamic(() => import('@/components/Nabvar'));

const Services = dynamic(() => import('@/components/Services'));

export default function Home() {
  return (
    <div>
     
      <Navbar/>
      <HeroSection/>
      <AboutUs/>
      <Services/>
      <WeOffer/>
      <Cart />
      <Footer/>
    </div>
  );
}
