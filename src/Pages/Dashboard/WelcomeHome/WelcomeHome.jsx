import React from 'react';
import { Helmet } from 'react-helmet';
import image from '../../../assets/sports.jpg'

const WelcomeHome = () => {
    const gradientStyle = {
        background: 'linear-gradient(to top, #ff8a00, #e52e71)',
        WebkitBackgroundClip: 'text', // For webkit browsers like Chrome and Safari
        color: 'transparent', // Make the text transparent
      };
    return (
        <div className='h-screen'>
            <Helmet>
                <title>Dashboard | Champion's Development academy</title>
            </Helmet>
            <div style={{ background: `url(${image})` }} className="md:text-3xl text-xl text-center h-full w-full p-8 uppercase ">
                <h1 className='py-8 font-semibold dark:text-white'> welcome to </h1>
                <span style={gradientStyle} className='md:text-4xl text-2xl pt-4 font-bold font-serif space-y-4'>champions development academy</span>
            </div>
        </div>
    );
};

export default WelcomeHome;