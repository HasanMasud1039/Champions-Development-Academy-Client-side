import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPlay, FaPlayCircle } from 'react-icons/fa';
import 'animate.css';
import banner from '../../../assets/bannerAbout.jpg'
import img1 from '../../../assets/about/sp.jpg'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const BannerAbout = () => {
    const [counterOn, setCounterOn] = useState(false)
    useEffect(() => {
        AOS.init({
            duration: 1200
        });
    }, [])
    return (
        <div>
            <div className='relative bg-green-900 '>
                <img className='h-96 w-full ' src={banner} alt="" />
            </div>
            <div className='md:flex justify-between'>
                <div className='flex flex-col md:gap-4 gap-2 py-0 md:mt-16 mt-4 relative md:w-[48%]'>
                    <img className='md:h-96 brightness-[70%]' src={img1} alt="" />
                    <div className=' flex justify-center gap-2 bottom-6'>
                        <img className='md:h-40 brightness-[70%] bg-red-400 animate__hinge animate__delay-4s animate__repeat-2' src='https://www.thinkhdi.com/~/media/HDICorp/Images/Topics/SupportWorld/graphics/team-celebration-x1800.jpeg' alt="" />
                        <img className='md:h-40 brightness-[70%] animate__hinge animate__delay-4s animate__repeat-2' src='https://s3-prod.adage.com/s3fs-public/20220314_ALIST_In-HouseAOY_LinkedIn_creativestudioteam_3x2b.png' alt="" />

                    </div>
                    <p className='text-[68px] text-orange-600  px-6 absolute top-[35%] md:left-[48%] left-[30%]'><FaPlayCircle /></p>
                </div>
                <div className='md:text-left text-center p-4 md:mt-6 mt-4 relative md:w-[55%] '>
                    <div className="md:w-5/12 my-4 text-center font-bold mx-auto space-y-2">
                        <p style={{ fontFamily: 'Playfair Display' }} className="text-fuchsia-600 md:text-xl dark:text-orange-500">--- About Us ---</p>
                        <h3 className="text-xl md:text-3xl  text-fuchsia-800 dark:text-orange-600 uppercase border-y-4 py-4">Why Select Us</h3>
                    </div>
                    {/* <SectionTitle heading={'Why Select Us'} subheading={'About Us'} additionalStyle={'text-center'}></SectionTitle> */}
                    <p className='md:text-lg text-md md:p-2 font-serif text-slate-500 dark:text-slate-200'>Champions Development Academy stands out as the premier choice for those seeking a comprehensive and dynamic learning experience in the realms of cricket, football, archery, and basketball. With a name synonymous with excellence, this summer camp school offers a unique blend of top-tier coaching, state-of-the-art facilities, and a nurturing environment that fosters holistic athlete development. The academy's commitment to cultivating skills extends beyond the sports arena, emphasizing values such as teamwork, discipline, and sportsmanship. Whether your passion lies in perfecting your cricket swing, mastering football techniques, honing archery precision, or refining basketball prowess, Champions Development Academy provides a platform where aspiring athletes can thrive. Choose this academy to embark on a journey where skill-building meets character development, creating champions on and off the field.</p>
                </div>
            </div>
            <hr />
            <ScrollTrigger onEnter={()=> setCounterOn(true)} onExit={()=> setCounterOn(false)}>
            <div className='py-12 md:mx-2 px-2 md:px-0 gap-2 md:flex md:justify-evenly justify-between grid grid-cols-2 md:space-y-0 space-y-4 text-center'>
                <p className='md:text-2xl md:font-semibold text-slate-500 '><span className='font-serif md:text-[34px] text-xl dark:text-white text-black font-bold'>{counterOn && <CountUp duration={5} className="counter" end={50} />}+ </span>Total Coaching Staff</p>
                <p className='md:text-2xl md:font-semibold text-slate-500 '><span className='font-serif md:text-[34px] text-xl dark:text-white text-black font-bold'>{counterOn && <CountUp duration={5} className="counter" end={400}/>}+ </span>Total Packages</p>
                <p className='md:text-2xl md:font-semibold text-slate-500 '><span className='font-serif md:text-[34px] text-xl dark:text-white text-black font-bold'>{counterOn && <CountUp duration={5} className="counter" end={10000}/>}+ </span>Total Alumni</p>
                <p className='md:text-2xl md:font-semibold text-slate-500 '><span className='font-serif md:text-[34px] text-xl dark:text-white text-black font-bold'>{counterOn && <CountUp duration={5} className="counter" end={4000}/>}+ </span>Positive Reviews</p>
            </div>
            </ScrollTrigger>

        </div>
    );
};

export default BannerAbout;