import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/banner/c1.jpg'
import img2 from '../../../assets/banner/c2.jpg'
import img3 from '../../../assets/banner/c3.jpg'
import img4 from '../../../assets/banner/c4.jpg'
import img5 from '../../../assets/banner/c5.jpg'
import img6 from '../../../assets/banner/c6.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
    const description = <div className="md:px-8 px-4 md:pt-12 pt-4 absolute rounded-xl md:w-[60%] w-[99%] items-end text-end  right-0 top-0 bg-gradient-to-l from-[#232222f9] to-[rgba(21, 21, 21, 0)] h-full">
        <h2 className="md:text-5xl text-start md:text-end md:font-bold font-semibold text-white md:my-6">Champions Development Academy</h2>
        <h5 className="md:text-2xl text-sm md:font-bold text-cyan-400">Welcome to Campions Development Academy, where champions are forged through dedication and training excellence!</h5>

        <p className="md:text-xl  text-xs md:block hidden text-slate-100 md:pt-8">Experience excellence at Campions Development Academy. Unleash your potential through expert coaching, cutting-edge facilities, and a passion for sports. Join us in shaping champions today!</p>
        <Link to={'/allClasses'}><button className='btn md:btn-lg btn-sm text-white md:font-bold md:text-lg bg-fuchsia-600 md:mt-8 btn-secondary'>ALL Classes</button></Link>
    </div>
    return (
            <Carousel autoPlay='true' showThumbs ={false}>
                <div>
                    <div className='relative min-h-fit'>
                        <img src={img1} />
                    </div>
                    {description}
                </div>
                <div>
                    <div className='relative min-h-fit'>
                        <img src={img2} />
                    </div>
                    {description}
                </div>
                <div>
                    <div className='relative min-h-fit'>
                        <img src={img3} />
                    </div>
                    {description}
                </div>
                <div>
                    <div className='relative min-h-fit'>
                        <img src={img4} />
                    </div>
                    {description}
                </div>
                <div>
                    <div className='relative min-h-fit'>
                        <img src={img5} />
                    </div>
                    {description}
                </div>
                <div>
                    <div className='relative min-h-fit'>
                        <img className='' src={img6} />
                    </div>
                    {description}
                </div>


            </Carousel>
    );
};

export default Banner;