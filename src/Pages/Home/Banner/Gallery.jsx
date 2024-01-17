import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../../../assets/gallary/a1.jpg'
import img2 from '../../../assets/gallary/b1.webp'
import img3 from '../../../assets/gallary/b2.jpeg'
import img4 from '../../../assets/gallary/c1.jpg'
import img5 from '../../../assets/gallary/ex.jpg'
import img6 from '../../../assets/gallary/f1.jpg'
import img7 from '../../../assets/gallary/f2.jpg'
import img8 from '../../../assets/gallary/g1.jpg'


const Gallery = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200
        });
      }, [])
    return (
        <div className='md:px-6 py-4'>
            <hr />
            <div data-aos="fade-up" className='md:flex md:justify-between grid grid-cols-2 gap-2 md:py-4 py-0'>
                <img className='md:w-40 w-36 h-28 md:h-40' src={img1} alt="" />
                <img className='md:w-40 w-36 h-28 md:h-40' src={img2} alt="" />
                <img className='md:w-40 w-36 h-28 md:h-40' src={img3} alt="" />
                <img className='md:w-40 w-36 h-28 md:h-40' src={img4} alt="" />
                <img className='md:w-40 w-36 h-28 md:h-40' src={img5} alt="" />
                <img className='md:w-40 w-36 h-28 md:h-40' src={img6} alt="" />
                {/* <img className='w-40 h-40 md:block hidden' src={img7} alt="" /> */}
            </div>
        </div>
    );
};

export default Gallery;