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
let count =0;
    feedbacks.map(fedback=>{
        const feds = typeof(fedback.feedback) !== "undefined";
        if(typeof(fedback.feedback) !== "undefined"){
            count++;
        }
        console.log(feds);
    })
    console.log(count);
    localStorage.setItem("feedbacks", count);
    return (
        <div className=' w-full h-full'>
            <Helmet>
                <title>Inbox | Champion's Development academy</title>
            </Helmet>
            {feedbacks.length > 0 ? <div >
                <p className='text-2xl font-bold text-center mx-auto my-6 p-4 uppercase'>Feedbacks from admin</p>
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-red-200 font-bold text-lg flex">
                        <tr className='uppercase'>
                            <th>#</th>
                            <th>Feedback</th>
                            <th>Class Name</th>
                            {/* <th>Available Seats</th> */}
                            {/* <th>Price</th> */}
                        </tr>
                    </thead>
                    <tbody className='text-lg'>
                        {feedbacks.map((feedback, index) => (
                            <div>
                                {
                                    feedback.feedback ?
                                        <tr key={feedback._id}>
                                            <th>{index+1 }</th>

                                            <td className='w-[50%]'>
                                                {feedback.feedback.feedback || feedback.feedback}

                                            </td>
                                            <td>
                                                {feedback.className}
                                            </td>

                                        </tr>
                                        :
                                        <></>
                                }
                            </div>

                        ))}
                    </tbody>
                </table>
            </div> : <div className='h-64 uppercase p-6'><p>no feedback from admin</p></div>

            }



        </div>
    );
};

export default InstructorInbox;