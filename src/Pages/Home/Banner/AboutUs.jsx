import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import md from '../../../assets/about/md1.png'
import instructor from '../../../assets/about/tea.png'
import guardian from '../../../assets/about/g.png'
import student from '../../../assets/about/std.png'
import AOS from 'aos';
import { useSpring } from '@react-spring/web';
import 'animate.css';
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import ScrollTrigger from 'react-scroll-trigger';

const AboutUs = () => {
    const [animation, setAnimation] = useState('');
    const springs = useSpring({
        from: { x: 300 },
        to: { x: 50 },
    });
    return (
        <div className='rounded-b-xl my-8 bg-blue-200 dark:bg-blue-900 py-4'>
            <SectionTitle subheading={'About Us'} heading={'bring everyone under one roof'}></SectionTitle>
            <ScrollTrigger onEnter={() => setAnimation('animate__animated animate__bounce animate__delay-2s')} onExit={() => setAnimation('')}>
                {animation &&
                    <div className='grid md:grid-cols-2 grid-cols-1 md:px-4 px-2 space-x-2 gap-2 py-8 text-center'>
                        <div>
                            <div className='relative mt-6 h-72'>
                                <div className='absolute border-2 rounded-xl bg-zinc-200 h-56 bottom-0'>
                                    <p style={{ fontFamily: 'Playfair Display' }} className={`${animation} flex flex-col border-0 rounded-2xl md:px-8 px-2 pt-8  text-center md:text-md text-sm`}><BiSolidQuoteAltLeft className='md:text-3xl text-xl text-teal-400' />
                                        Welcome to our sports academy, where we nurture champions. We'll reach heights of excellence and achievement! Our commitment to excellence ensures your journey towards success is unmatched. <br /> <span className='flex justify-center py-2 font-bold'>Mr. Hardy Hasan</span><span className='flex justify-center '>Managing Director</span></p>
                                </div>
                                <img className='absolute border-4 border-teal-400 rounded-full md:h-[150px] h-[130px] w-[130px] md:w-[150px] p-1 bg-zinc-300 top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={md} alt="" />

                            </div>
                        </div>
                        <div>
                            <div className='relative mt-6 h-72'>
                                <div className='absolute border-2 rounded-xl bg-zinc-200 h-56 bottom-0'>
                                    <p style={{ fontFamily: 'Playfair Display' }} className={`${animation} flex flex-col border-0 rounded-2xl md:px-8 px-2 pt-8  text-center md:text-md text-sm`}><BiSolidQuoteAltLeft className='text-3xl text-sky-400' />As a proud guardian, I witness the transformation our sports academy brings to our young athletes. Their dedication inspires us all. I wish their supreme success. Thank you for your support.<br /> <span className='flex justify-center py-2 font-bold'>Mr. Zahir</span> <span className='flex justify-center '>Guardian</span></p>
                                </div>
                                <img className='absolute border-4 border-sky-400 rounded-full h-[150px] w-[150px] p-1 bg-zinc-300 top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={guardian} alt="" />

                            </div>
                        </div>
                        <div>
                            <div className='relative mt-6 h-72'>
                                <div className='absolute border-2 rounded-xl bg-zinc-200 h-56 bottom-0'>
                                    <p style={{ fontFamily: 'Playfair Display' }} className={`${animation} flex flex-col border-0 rounded-2xl md:px-8 px-2 pt-8  text-center md:text-md text-sm`}><BiSolidQuoteAltLeft className='text-3xl text-fuchsia-400' />Inspiring young athletes is our privilege. Through hard work and discipline, we'll mold champions of tomorrow. Let's strive for greatness together in our sports academy!<br /> <span className='flex justify-center py-2 font-bold'>Mr. Amir Khan</span> <span className='flex justify-center '>Instructor</span></p>
                                </div>
                                <img className='absolute border-4 border-fuchsia-400 rounded-full h-[150px] w-[150px] p-1 bg-zinc-300 top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={instructor} alt="" />

                            </div>
                        </div>
                        <div>
                            <div className='relative mt-6 h-72'>
                                <div className='absolute border-2 rounded-xl bg-zinc-200 h-56 bottom-0'>
                                    <p style={{ fontFamily: 'Playfair Display' }} className={`${animation} flex flex-col border-0 rounded-2xl md:px-8 px-2 pt-8  text-center md:text-md text-sm`}><BiSolidQuoteAltLeft className='text-3xl text-rose-400' />At our sports academy, we learn teamwork, resilience, and the pursuit of excellence. Together, we chase our dreams, setting the stage for a brighter future in sports. Thank you!<br /> <span className='flex justify-center py-2 font-bold'>Tulip sarah</span> <span className='flex justify-center '>Student</span></p>
                                </div>
                                <img className='absolute border-4 border-rose-400 rounded-full h-[150px] w-[150px] p-1 bg-zinc-300 top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2' src={student} alt="" />

                            </div>
                        </div>
                    </div>}

            </ScrollTrigger>
        </div>
    );
};

export default AboutUs;