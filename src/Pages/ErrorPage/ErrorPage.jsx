import React from 'react';
import photo from '/error.gif'
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
const ErrorPage = () => {
    return (
        <div>
            <Helmet>
                <title>Error | Champion's Development academy</title>
            </Helmet>
            <div className='md:h-[700px]  mt-4'>
                <img className='mx-auto w-full h-[99%] rounded-t-xl' src={photo} alt="" />
            </div>
            <div className=' text-xl bg-red-700 rounded-b-xl flex justify-center md:py-6 py-2'>
                <Link to='/'><button className='btn text-5xl text-yellow-800'><FaHome></FaHome></button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;