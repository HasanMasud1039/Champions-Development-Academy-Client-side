import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import { FaBriefcase } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';



const PopularInstructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: instructors = [], refetch } = useQuery(
        ["instructors"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get(`/popularInstructors`);
                // const res = await axiosSecure.get(`/users/popularClass`);
                return res.data;
            },
        }
    );
    
    return (
        <div className='py-4'>
            <SectionTitle subheading="Have a Look" heading="Our Popular Instructors"></SectionTitle>
            <div className='grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 md:p-4'>
                {instructors.map(instructor =>
                    <div className="card md:w-[90%] bg-base-100 dark:bg-black dark:text-white border-2 shadow-xl md:border-4">
                        <figure><img className='w-full h-[250px] md:h-[350px]' src={instructor?.imageURL} alt="Instructor" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold text-lg md:text-2xl">
                                {instructor?.name}

                            </h2>
                            <div className="md:card-actions justify-start flex-col">
                                <p className='md:text-xl text-lg'>{instructor?.category || instructor?.className}</p>

                                <div className="md:badge  md:badge-outline md:text-lg md:p-4 p-2 mt-2 gap-2 md:font-bold"><FaBriefcase></FaBriefcase> {instructor?.experience} </div>
                            </div>


                        </div>
                        <label htmlFor={instructor._id} className="btn mx-auto mb-4 btn-sm btn-outline bg-fuchsia-600 text-white ">Details</label>

                        <input type="checkbox" id={instructor._id} className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box grid grid-cols-2 gap-4 dark:text-white dark:bg-black border-2">
                                <div>
                                    <img className='rounded-tr-2xl rounded-bl-2xl mb-4 w-full h-[250px]' src={instructor?.imageURL} alt="" />
                                    <p className="font-bold text-xl mb-2">{instructor?.name}</p>
                                    <p> <span className='font-bold'>Age: </span>{instructor?.age} years</p>
                                    <p> <span className='font-bold'>Experience: </span> {instructor?.experience}</p>
                                </div>
                                <div>

                                    <h3 className="font-bold text-lg">{instructor?.category || instructor.className}</h3>
                                    <h3 ><span className='font-bold'>Skills: </span>{instructor?.skill}</h3>
                                    <p className="py-4">{instructor?.description}</p>
                                    <p> <span className='font-bold'>Email: </span> {instructor?.email}</p>
                                    <p> <span className='font-bold'>Contact: </span> {instructor?.contact}</p>
                                    <p> <span className='font-bold'>Address: </span> {instructor?.address}</p>
                                    <div className="modal-action">
                                        <label htmlFor={instructor._id} className="btn">Close!</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}




            </div>

        </div >
    );
};

export default PopularInstructors;