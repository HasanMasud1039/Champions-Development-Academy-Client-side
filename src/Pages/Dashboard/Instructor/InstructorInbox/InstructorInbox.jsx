import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const InstructorInbox = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const [fdbacks, setFdbacks] = useState([]);
    const { data: feedbacks = [] } = useQuery({
        enabled: !loading,
        queryKey: ["feedback", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/admin/feedback/${user.email}`
            );
            console.log(res.data);
            // setFeedbacks(res.data);
            return res.data;
        },
    });
    let count = 0;
    feedbacks.map(fedback => {
        const feds = typeof (fedback.feedback) !== "undefined";
        if (typeof (fedback.feedback) !== "undefined") {
            count++;
        }
        console.log(feds);
    })
    console.log(count);
    localStorage.setItem("feedbacks", count);
    return (
        <div className='mt-4 w-full h-full'>
            <Helmet>
                <title>Inbox | Champion's Development academy</title>
            </Helmet>
            {feedbacks.length > 0 ? <div >
                <label className='animate__animated animate__jello w-full bg-red-800 text-white py-3 px-4 font-semibold uppercase'><span className="border-cyan-400 border-4 me-4" />Feedbacks from admin</label>

                {/* <p className='text-2xl font-bold text-center mx-auto my-6 p-4 uppercase dark:text-white'>Feedbacks from admin</p> */}
                <table className="table light:table-zebra mt-8 w-full">
                    {/* head */}
                    <thead className="bg-sky-400 dark:bg-sky-500 text-black rounded-t-xl font-bold text-lg">
                        <tr className='uppercase'>
                            <th className="py-2">#</th>
                            <th className="py-2">Feedback</th>
                            <th className="py-2">Class Name</th>
                        </tr>
                    </thead>
                    <tbody className='text-lg bg-red-100 dark:bg-black dark:text-white'>
                        {feedbacks.map((feedback, index) => (
                            <tr key={feedback._id} className={(index % 2 === 0) ? 'bg-white dark:bg-slate-600' : 'bg-gray-200 dark:bg-slate-800'}>
                                <td className="py-2">{index + 1}</td>
                                <td className="py-2 w-[50%]">
                                    {feedback.feedback?.feedback || feedback.feedback}
                                </td>
                                <td className="py-2">
                                    {feedback.className}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div> : <div className='h-64 uppercase p-6'><p>no feedback from admin</p></div>
            }
        </div>
    );
};

export default InstructorInbox;