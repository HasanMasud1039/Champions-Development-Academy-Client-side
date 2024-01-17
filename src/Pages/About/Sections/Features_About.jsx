import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHandHoldingHeart, FaRegHandshake, FaUserSecret, FaWallet } from 'react-icons/fa';
import { SiYourtraveldottv } from 'react-icons/si';
import { TbBrandBooking } from 'react-icons/tb';
import SectionTitle from '../../../Components/SectionTitle';

const Features_About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200
        });
      }, [])
    return (
        <div className='py-8 bg-slate-100 dark:bg-slate-800'>
            <SectionTitle heading={'Why Choose Us'} subheading={'Features'} additionalStyle={'text-center'}></SectionTitle>
            <div className='text-center grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-1 md:px-[10%] px-2 py-4 '>
                    <div data-aos="fade-right" className='bg-white dark:bg-black text-left space-y-4 shadow-lg w-[97%]   md:p-8 p-4'>
                        <div className=' relative btn btn-warning w-12 rounded-full'>
                            <p className='left-2 text-3xl font-semibold font-serif absolute'><FaWallet className='text-3xl'/> </p>
                        </div>
                        <br /><span className='md:text-xl text-sm  text-black font-bold my-4 dark:text-white'>Skilled Instructors</span>
                        <br /><span className='md:text-lg text-sm text-slate-600 dark:text-slate-300 font-semibold'>We have the best coaching staff in different sectors.</span>
                    </div>
                    <div data-aos="fade-down" className='bg-white dark:bg-black text-left space-y-4 shadow-lg w-[97%]  md:p-8 p-4'>
                        <div className=' relative btn btn-warning w-12 rounded-full'>
                            <p className='left-2 text-3xl font-semibold font-serif absolute'><SiYourtraveldottv/> </p>
                        </div>
                        <br /><span className='md:text-xl text-sm  text-sm text-black font-bold my-4 dark:text-white'>Best Career Plan</span>
                        <br /><span className='md:text-lg text-sm text-slate-600 dark:text-slate-300 font-semibold'>We provide the best plan according to our students capabilities.</span>
                    </div>
                    <div data-aos="fade-left" className='bg-white dark:bg-black text-left space-y-4 shadow-lg w-[97%]  md:p-8 p-4'>
                        <div className=' relative btn btn-warning w-12 rounded-full'>
                            <p className='left-2 text-3xl font-semibold font-serif absolute'><FaRegHandshake className='text-[36px]'/> </p>
                        </div>
                        <br /><span className='md:text-xl text-sm  text-sm  text-black font-bold my-4 dark:text-white'>Safe Accommodation </span>
                        <br /><span className='md:text-lg text-sm text-slate-600 dark:text-slate-300 font-semibold'>We provide safe and secure accommodation in a friendly manner.</span>
                    </div>
                    <div data-aos="fade-right" className='bg-white dark:bg-black text-left space-y-4 shadow-lg w-[97%]   md:p-8 p-4'>
                        <div className=' relative btn btn-warning w-12 rounded-full'>
                            <p className='left-2 text-3xl font-semibold font-serif absolute'><FaUserSecret className='text-3xl'/> </p>
                        </div>
                        <br /><span className='md:text-xl text-sm  text-sm  text-black font-bold my-4 dark:text-white'>Extra Guideline</span>
                        <br /><span className='md:text-lg text-sm text-slate-600 dark:text-slate-300 font-semibold'>We provide extra guidelines for our talented candidates.</span>
                    </div>
                    <div data-aos="fade-up" className='bg-white dark:bg-black text-left space-y-4 shadow-lg w-[97%]   md:p-8 p-4'>
                        <div className=' relative btn btn-warning w-12 rounded-full'>
                            <p className='left-2 text-3xl font-semibold font-serif absolute'><TbBrandBooking className='text-3xl'/> </p>
                        </div>
                        <br /><span className='md:text-xl text-sm  text-black font-bold my-4 dark:text-white'>Easy & Quick Booking</span>
                        <br /><span className='md:text-lg text-sm text-slate-600 dark:text-slate-300 font-semibold'>We provide private the easiest and quickest booking facilities.</span>
                    </div>
                    <div data-aos="fade-left" className='bg-white dark:bg-black text-left space-y-4 shadow-lg w-[97%]   md:p-8 p-4'>
                        <div className=' relative btn btn-warning w-12 rounded-full'>
                            <p className='left-2 text-3xl font-semibold font-serif absolute'><FaHandHoldingHeart className='text-3xl'/> </p>
                        </div>
                        <br /><span className='md:text-xl text-sm  text-black font-bold my-4 dark:text-white'>Scholarship</span>
                        <br /><span className='md:text-lg text-sm text-slate-600 dark:text-slate-300 font-semibold'>We provide 50% to 70% scholarship on performance of students.</span>
                    </div>
                </div>

        </div>
    );
};

export default Features_About;