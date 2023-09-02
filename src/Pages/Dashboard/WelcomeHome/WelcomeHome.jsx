import React from 'react';
import { Helmet } from 'react-helmet';

const WelcomeHome = () => {
    return (
        <div>
            <Helmet>
                <title>Dashboard | Champion's Development academy</title>
            </Helmet>
            <div className="md:text-4xl text-2xl text-center mb-5 mt-5 uppercase ">
                <h1 className='pb-8'> welcome to </h1>
                <span className='md:text-5xl text-2xl pt-4 text-red-500 font-bold font-serif space-y-4'>champions development academy</span>
            </div>
        </div>
    );
};

export default WelcomeHome;