import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import AOS from 'aos';
import { useSpring } from '@react-spring/web';
import cer1 from '../../../assets/achievement/cer1.jpg'
import cer2 from '../../../assets/achievement/cer2.jpg'
import cer6 from '../../../assets/achievement/cer6.jpg'
import cer4 from '../../../assets/achievement/cer4.jpg'
import cer5 from '../../../assets/achievement/cer5.jpg'
import cer8 from '../../../assets/achievement/cer8.jpg'
import cer9 from '../../../assets/achievement/cer9.avif'
import cer10 from '../../../assets/achievement/cer10.jpg'
import cer11 from '../../../assets/achievement/cer11.jpg'
import cer12 from '../../../assets/achievement/cer12.webp'
import aw1 from '../../../assets/achievement/aw1.jpg'
import aw2 from '../../../assets/achievement/aw2.jpg'
import aw3 from '../../../assets/achievement/aw3.jpg'
import aw4 from '../../../assets/achievement/aw4.jpeg'
import aw5 from '../../../assets/achievement/aw5.jpg'

const Achievement = () => {
    const springs = useSpring({
        from: { x: 300 },
        to: { x: 50 },
    });
    return (
        <div>
            <SectionTitle subheading={"Our Achievements"} heading={"wall of fame"}></SectionTitle>
            <div className='border-2 p-2'>
                <div className='border-2 md:h-[760px] space-y-4 md:p-2'>
                    <div className=' md:h-[230px] flex gap-1 md:p-2'>
                        <div data-aos="zoom-in" data-aos-duration="2000"><img className=' md:h-[220px] h-[150px] hover:scale-150' src={cer1} alt="" /></div>
                        <div data-aos="zoom-out" data-aos-duration="2000"><img className='md:h-[220px] h-[150px] hover:scale-150' src={cer2} alt="" /></div>
                        <div data-aos="zoom-in" data-aos-duration="2000"><img className=' md:h-[220px] h-[150px] hover:scale-150' src={cer4} alt="" /></div>
                        <div data-aos="zoom-out" data-aos-duration="2000"><img className=' md:h-[220px] h-[150px]  hover:scale-150' src={cer5} alt="" /></div>
                        <div data-aos="zoom-in" data-aos-duration="2000"><img className=' md:h-[220px] h-[150px] hover:scale-150' src={cer6} alt="" /></div>

                    </div>

                    <div className=' md:h-[250px] flex gap-2'>
                        <div data-aos="zoom-out-left" data-aos-duration="2000"><img className=' md:h-[250px] h-[150px] hover:scale-150' src={cer8} alt="" /></div>
                        <div data-aos="zoom-in" data-aos-duration="2000"><img className='md:h-[250px] h-[150px] hover:scale-150' src={cer10} alt="" /></div>
                        <div data-aos="zoom-out" data-aos-duration="2000"><img className='md:h-[250px] h-[150px] hover:scale-150' src={cer11} alt="" /></div>
                        <div data-aos="zoom-in-right" data-aos-duration="2000"><img className='md:h-[250px] h-[150px] hover:scale-150' src={cer12} alt="" /></div>
                        {/* <div data-aos="zoom-out" data-aos-duration="2000"><img className='bg-red-400 h-[220px] hover:scale-150' src={cer9} alt="" /></div> */}
                    </div>

                    <div className=' md:h-[220px] grid grid-cols-3 space-x-2'>
                        <div className='grid grid-cols-2 gap-2 md:h-[220px] h-[150px]'>
                            <div data-aos="zoom-in" data-aos-duration="2000"><img className='w-full md:h-[220px] h-[80%] hover:scale-150' src={aw1} alt="" /></div>
                            <div data-aos="zoom-out" data-aos-duration="2000"><img className=' w-full md:h-[220px] h-[80%]  hover:scale-150' src={aw2} alt="" /></div>

                        </div>
                        <div className='gird grid-cols-1 md:h-[220px] h-[150px]'>
                            <div data-aos="zoom-in" data-aos-duration="2000"><img className=' w-full md:h-[220px] h-[120px] hover:scale-150' src={aw5} alt="" /></div>

                        </div>
                        <div className='grid grid-cols-2 gap-2 md:h-[220px] h-[150px]'>
                            <div data-aos="zoom-out" data-aos-duration="2000"><img className=' w-full md:h-[220px] h-[80%] hover:scale-150' src={aw3} alt="" /></div>
                            <div data-aos="zoom-in" data-aos-duration="2000"><img className='  w-full md:h-[220px] h-[80%] hover:scale-150' src={aw4} alt="" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Achievement;