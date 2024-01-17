import React from 'react';
import image from '../../../assets/super.jpg'
import './SuperAdminStyle.css'
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';
const SuperAdminHome = () => {
    const { user } = useAuth();
    return (
        <div className='container flex flex-col text-center'>
            <Helmet>
                <title>Super-Admin Home | Champion's Development academy</title>
            </Helmet>
            <div className='gradientText space-y-6'>
                <p className='md:text-4xl text-xl font-bold font-serif '>Welcome</p>
                <p style={{ textShadow: '4px 4px 4px black' }} className='md:text-4xl text-xl font-bold font-serif text-orange-500'>Our Super-Duper Admin</p>
                <p className='md:text-5xl text-2xl font-bold font-serif'>Mr. {user.displayName}</p>
            </div>
        </div>
    );
};

export default SuperAdminHome;