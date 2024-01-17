import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaAddressCard, FaEnvelope, FaLocationArrow, FaUser } from 'react-icons/fa';

const UserHome = () => {
    const { user } = useAuth();

    const styles = {
        cellHeader: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            fontWeight: 'bold',
        },
        cell: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
        },
    };

    return (
        <div>
            <Helmet>
                <title>User Home | Champion's Development academy</title>
            </Helmet>
            <p className='md:text-3xl dark:text-white font-bold text-center pt-6'>Welcome!</p>
            <p className='md:text-2xl dark:text-white font-bold text-center md:p-6 p-4'>Our valuable user <span className='text-red-500'>{user.displayName}</span>.</p>
            <hr />
            <div className='pt-4 md:flex flex-col gap-4'>
                <div className='flex justify-center'>
                    <img className='rounded-tr-3xl rounded-bl-3xl md:w-64 md:h-64 w-72 h-48' src={user?.photoURL} alt="" />
                </div>
                <div className=' py-2 px-4 space-y-2 dark:text-white md:w-[70%] w-full bg-zinc-300 dark:bg-cyan-950 mx-auto'>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <tbody className="" style={{ textAlign: 'left' }}>
                            <tr>
                                <td className='flex gap-2 items-center text-cyan-600' style={styles.cellHeader}><FaUser/> Name</td>
                                <td style={styles.cell}>{user.displayName}</td>
                            </tr>
                            <tr>
                                <td className='flex gap-2 items-center text-rose-600' style={styles.cellHeader}><FaEnvelope/> Email</td>
                                <td style={styles.cell}>{user.email}</td>
                            </tr>
                            <tr>
                                <td className='flex gap-2 items-center text-green-600' style={styles.cellHeader}><FaAddressCard/> Contact</td>
                                <td style={styles.cell}>{user?.contact}</td>
                            </tr>
                            <tr>
                                <td className='flex gap-2 items-center text-orange-600' style={styles.cellHeader}><FaLocationArrow/> Address</td>
                                <td style={styles.cell}>{user?.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default UserHome;