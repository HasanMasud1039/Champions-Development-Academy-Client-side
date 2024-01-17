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
    // console.log("total", totalPayments)

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
                <p className='md:text-3xl text-xl dark:text-white font-bold text-center pt-6'>Welcome!</p>
                <p className='md:text-2xl text-lg dark:text-white font-bold text-center md:p-6 p-2'>Our Honorable Admin <br /><br /><span className='text-red-500 text-3xl mt-4'>{user.displayName}</span></p>
            </animated.div>
            <hr />
            <div className='md:flex gap-0 space-y-0 mt-4 justify-center'>
                <div className=' md:rounded-s-3xl dark:bg-gradient-to-r from-lime-800 to-slate-500   bg-lime-200 shadow-2xl  border border-0 text-center p-6'>

                    <p className='md:text-2xl dark:text-lime-100 mb-2 font-semibold'>Total Classes</p>
                    <hr />
                    <div className="avatar mt-4  gap-6">
                        <div className="w-24 mask mask-hexagon">
                            <img src="https://c8.alamy.com/comp/2RKTX7N/speech-icon-vector-icon-isolated-on-white-background-2RKTX7N.jpg" />
                        </div>
                        <div className='text-3xl font-bold dark:text-white text-orange-600 py-6'>{classes.length}</div>
                    </div>
                </div>
                <div className='  bg-lime-200 dark:bg-slate-500  shadow-xl  border border-0 text-center p-6'>

                    <p className='md:text-2xl mb-2 dark:text-lime-100 font-semibold'>Total Users</p>
                    <hr />
                    <div className="avatar mt-4  gap-6">
                        <div className="w-24 mask mask-hexagon">
                            <img src="https://i.ibb.co/3pk3wnJ/pngtree-vector-avatar-icon-png-image-889339.jpg" />
                        </div>
                        <div className='text-3xl font-bold dark:text-white text-orange-600 py-6'>{users.length}</div>
                    </div>
                </div>
                <div className=' md:rounded-e-3xl dark:bg-gradient-to-r from-slate-500 to-lime-800  bg-lime-200 shadow-xl border border-0 text-center p-6'>

                    <p className='md:text-2xl dark:text-lime-100 mb-2 font-semibold'>Total Payments</p>
                    <hr />
                    <div className="avatar mt-4 gap-6">
                        <div className="w-24 mask mask-hexagon">
                            <img src="https://www.cnet.com/a/img/resize/59632b8a85ec0a99c487470d20318679631555cb/hub/2015/09/23/3d8ca926-8459-4aee-9825-f14fb8e7ae3d/mobile-payments-visa-paywave-chip-security-credit-cards-4889.jpg?auto=webp&fit=crop&height=675&width=1200" />
                        </div>
                        <div className='text-3xl font-bold dark:text-white text-orange-600 py-6'>{totalPayments.length}</div>
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default AdminHome;