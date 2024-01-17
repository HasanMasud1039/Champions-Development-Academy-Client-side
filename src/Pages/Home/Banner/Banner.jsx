import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/banner/c11.jpg'
import img2 from '../../../assets/banner/c22.jpg'
import img3 from '../../../assets/banner/c33.jpg'
import img4 from '../../../assets/banner/c44.jpg'
import img5 from '../../../assets/banner/c55.jpg'
import img6 from '../../../assets/banner/c66.jpg'
import img7 from '../../../assets/banner/c77.jpg'
import img8 from '../../../assets/banner/c88.jpg'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import 'swiper/css';

const Banner = () => {
    const description = <div className="md:px-8 px-4 md:pt-12 md:space-y-6 pt-4 absolute rounded-xl md:w-[60%] w-[99s%] items-end text-end  right-0 top-0 bg-gradient-to-l from-[#232222f9] to-[rgba(21, 21, 21, 0)] h-full">
        <h2 className="md:text-5xl text-end md:font-bold font-semibold text-white md:my-6">Champions Development Academy</h2>
        <h5 className="md:text-2xl text-sm md:font-bold text-cyan-400">Welcome to Campions Development Academy, where champions are forged through dedication and training excellence!</h5>

        <p className="md:text-xl md:pb-8 text-xs md:block hidden text-slate-100 md:pt-8">Experience excellence at Campions Development Academy. Unleash your potential through expert coaching, cutting-edge facilities, and a passion for sports. Join us in shaping champions today!</p>
        <Link to={'/allClasses'}><button className='btn md:btn-lg btn-sm text-white md:font-bold md:text-lg bg-orange-600 mt-8 btn-secondary'>ALL Classes</button></Link>
    </div>
    return (
        <div className='relative'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img className='' src={img1} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img2} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img3} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img4} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img5} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img6} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img7} />
                    </div>
                    {description}
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative min-h-fit w-full'>
                        <img src={img8} />
                    </div>
                    {description}
                </SwiperSlide>


            </Swiper>
        </div>
    );
};

export default Banner;