import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button'
const Hero = () => {
  return (
    <div className='flex flex-col items-center xl:mx-60 lg:mx-60 md:mx-48 mx-10 gap-9'>
        <h1 className='font-extrabold xl:text-[56px] lg:text-[56px] md:text-[48px] text-[32px] mt-16'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>

        <Link to={'/create-trip'}>
        <Button>Get Started, it's Free</Button>
        </Link>
        <div className='w-[90%]'>
          <img src="landing.png" alt="laptop" className='md:h-[550px] sm:h-[350px] w-full object-cover ' />
        </div>
        
    </div>
  )
}

export default Hero