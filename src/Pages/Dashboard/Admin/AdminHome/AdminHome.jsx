import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSpring, animated } from '@react-spring/web';
import { Helmet } from 'react-helmet';

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery(
        ["AllClassesBYAdmin"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get("/classes/all");
                return res.data;
            },
        }
    );
    const { data: users = [] } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
    });
    const { data: totalPayments = [] } = useQuery(["payment"], async () => {
        const res = await axiosSecure.get("/paymentDone");
        return res.data;
    });
    console.log("total", totalPayments)

    const springs = useSpring({
        from: { x: 300 },
        to: { x: 50 },
    });
    return (
        <div className=''>
            <Helmet>
                <title>Admin Home | Champion's Development academy</title>
            </Helmet>
            <animated.div
                style={{
                    ...springs,
                }}
            >
                <p className='text-3xl dark:text-white font-bold md:text-center pt-6'>Welcome!</p>
                <p className='text-2xl dark:text-white font-bold md:text-center md:p-6 p-2'>Our Honorable Admin <span className='text-red-500'>{user.displayName}</span>.</p>
            </animated.div>
            <div className='md:flex gap-4 space-y-2 justify-center'>
                <div className='h-[200px] rounded-3xl bg-lime-200 shadow-xl w-[200px] border border-4 text-center p-6'>

                    <p className='text-xl dark:text-lime-800'>Number of classes</p>
                    <p className='text-3xl font-bold text-orange-600 py-6'>{classes.length}</p>
                </div>
                <div className='h-[200px] rounded-3xl bg-lime-200 shadow-xl w-[200px] border border-4 text-center p-6'>

                    <p className='text-xl dark:text-lime-800'>Number of users</p>
                    <p className='text-3xl font-bold text-orange-600 py-6'>{users.length}</p>
                </div>
                <div className='h-[200px] rounded-3xl bg-lime-200 shadow-xl w-[200px] border border-4 text-center p-6'>

                    <p className='text-xl dark:text-lime-800'>Number of payments</p>
                    <p className='text-3xl font-bold text-orange-600 py-6'>{totalPayments.length}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;