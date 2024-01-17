import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCheck, FaDiceFive, FaDiceFour, FaDiceOne, FaDiceSix, FaDiceThree, FaDiceTwo } from 'react-icons/fa';
import photo from '../../../assets/banner/cric.png'

const Choice = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200
        });
    }, [])
    return (
        <div className='relative  md:flex justify-evenly md:p-12 md:p-4 gap-12 dark:bg-zinc-700 mt-6 dark:text-white'>
            <div style={{ backgroundImage: `url(${photo})` }} className='absolute bg-cover  left-12 h-[600px] md:w-[40%]'>

            </div>
            <div data-aos="fade-left" className='md:ms-[-50px] flex flex-col backdrop-blur-sm  justify-between  md:w-[46%] h-[600px] shadow-lg'>
                <div className=' '>
                    <div className=' h-[500px]'>
                        <img className='absolute top-[-30px] right-[-20px] md:right-[-30px] md:w-[90%] h-[540px]' src={photo} alt="" />
                    </div>
                </div>
                <p className='md:text-2xl text-xl text-red-700 font-bold pb-8 pt-6 md:pl-20 pl-4'><span className='md:text-[40px] text-blue-600 font-serif'>10+</span> Years of Experience</p>
            </div>
            <div data-aos="fade-right" className='shadow-lg md:px-8 px-2 md:pt-0 pt-4 md:w-[50%] dark:bg-black bg-rose-100'>
                <div className=' space-y-2 md:my-8 my-4 py-2'>
                    <div className="md:w-[60%] md:my-4 text-center space-y-2 font-bold mx-auto">
                        <p style={{fontFamily: 'Playfair Display'}} className="text-fuchsia-600 md:text-xl dark:text-orange-500">--- Why You Choose Us ---</p>
                        <h3 className="text-xl md:text-2xl  text-fuchsia-800 dark:text-orange-600 uppercase border-y-4 py-4">Make Your Dream Come True</h3>
                    </div>
                    <p className='text-normal font-semibold text-slate-400 md:text-lg text-sm text-center'>Optimize proactive strategic topic areas  holistically as opposed to producing efficient & skilled sportsmen.</p>
                </div>
                <div className='grid grid-cols-2 md:gap-4 dark:text-slate-300 md:text-lg text-sm md:p-4 p-2'>
                    <p className='flex gap-2 md:gap-4 font-semibold font-serif'><FaDiceOne />Skilled Instructors</p>
                    <p className='flex gap-2 md:gap-4 font-semibold font-serif'><FaDiceTwo />Accommodation</p>
                    <p className='flex gap-2 md:gap-4  font-semibold font-serif'><FaDiceThree />Ground Facility</p>
                    <p className='flex gap-2 md:gap-4 font-semibold font-serif'><FaDiceFour />Medical Facility</p>
                    <p className='flex gap-2 md:gap-4  font-semibold font-serif'><FaDiceFive />Scholarship</p>
                    <p className='flex gap-4  font-semibold font-serif'><FaDiceSix />5 Years Membership</p>
                </div>
                {/* <button className='btn p-4 dark:text-white btn-outline my-8 hover:btn-warning'>Contact Us</button> */}
            </div>
        </div>

    );
};

export default Choice;