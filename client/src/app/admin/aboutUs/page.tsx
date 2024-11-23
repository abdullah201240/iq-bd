import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/aboutFrom'));



export default function Home() {
  return (
    <div>
        <About/>
     
    
    </div>
  );
}
