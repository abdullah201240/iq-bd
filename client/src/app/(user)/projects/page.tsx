import Footer from '@/components/Footer'
import Navbar from '@/components/Nabvar'
import ServicesTitle from '@/components/ServicesTitle'
import Whatsapp from '@/components/Whatsapp'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar/>
        <ServicesTitle 
       title="Projects"
       subTitle="Explore our architecture firm's project section, transforming ideas into reality featuring cutting-edge designs and successful collaborations that redefine spaces and enhance communities."
      />
      <div>


        
      </div>



      <Footer/>
      <Whatsapp/>


      
    </div>
  )
}
