import React, { useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import { FaBriefcase } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AOS from 'aos';
import './HomeSection.css'
import { useSpring } from '@react-spring/web';
import { RiUserHeartFill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import { AiTwotoneMail } from "react-icons/ai";
import { BiSolidContact } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";


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
    const springs = useSpring({
        from: { x: 300 },
        to: { x: 50 },
    });
    
    return (
        <div className='py-4'>
            <SectionTitle subheading="Have a Look" heading="Our Popular Instructors"></SectionTitle>
            <div  className='grid instructor  md:grid-cols-5 grid-cols-2 md:gap-1 gap-2 md:p-4 '>
                {instructors.map(instructor =>
                    <div data-aos="fade-up-right"  data-aos-duration="1500" className=" card  md:w-[95%] shadow-xl border-2 bg-gradient-to-b from-sky-400 rounded-none dark:text-white border-1 shadow-xl  md:border-1">
                        <figure><img className='w-full h-[250px]' src={instructor?.imageURL} alt="Instructor" /></figure>
                        <div className="md:card-body text-center md:space-y-0 space-y-4">
                            <h2 className="md:card-title font-bold text-lg md:text-xl md:pt-0 pt-3">
                                {instructor?.name}

                            </h2>
                            <div className="md:card-actions justify-start flex-col">
                                <p className=' md:text-lg text-sm'>{instructor?.category || instructor?.className}</p>

                                {/* <div className="md:badge  md:badge-outline md:text-lg md:p-4 p-2 mt-2 gap-2 md:font-bold"><FaBriefcase></FaBriefcase> {instructor?.experience} </div> */}
                            </div>


                        </div>
                        <label htmlFor={instructor._id} className="btn mx-auto my-4 btn-sm btn-outline bg-gradient-to-t from-teal-500 to-blue-700 text-white ">Details</label>

                        <input  type="checkbox" id={instructor._id} className="modal-toggle" />
                        <div className="modal ">
                                <div className="modal-box dark:border-4 dark:border-red-300 grid md:grid-cols-2 gap-4 dark:bg-slate-800 dark:text-white">
                                    <div>
                                        <img className='rounded-lg mb-4 w-full md:h-[250px] h-[180px]' src={instructor?.imageURL || instructor?.photo} alt="" />
                                        <p className="font-bold md:text-xl mb-2">{instructor?.name}</p>
                                        <p className='md:text-md text-sm flex gap-2 mt-2'><RiUserHeartFill className='text-xl text-sky-500'/> <span className='font-bold text-sky-500'>Age: </span>{instructor?.age} years</p>
                                        <p className='md:text-md text-sm flex gap-2 mt-2'><FaBriefcase className='text-xl text-lime-500'/> <span className='font-bold text-lime-500'>Experience: </span> {instructor?.experience}</p>
                                    </div>
                                    <div>

                                        <h3 className="font-bold md:text-lg">{instructor?.category}</h3>
                                        <h3 className='md:text-md text-sm flex gap-2 mt-2'><GiSkills className='text-xl text-emerald-500'/><span className='font-bold text-emerald-500'>Skills: </span>{instructor?.skill}</h3>
                                        <p className='md:text-md text-sm py-2'>{instructor?.description}</p>
                                        <p className='md:text-md text-sm flex gap-2 mt-2'><AiTwotoneMail className='text-xl text-orange-500'/> <span className='font-bold text-orange-500'>Email: </span> {instructor?.email || instructor?.email}</p>
                                        <p className='md:text-md text-sm flex gap-2 mt-2'><BiSolidContact className='text-xl text-purple-500'/> <span className='font-bold text-purple-500'>Contact: </span> {instructor?.contact}</p>
                                        <p className='md:text-md text-sm flex gap-2 mt-2'><IoLocation className='text-xl text-blue-500'/> <span className='font-bold text-blue-500'>Address: </span> {instructor?.address}</p>
                                        <div className="modal-action">
                                            <label htmlFor={instructor?._id} className="btn p-2 text-white bg-gradient-to-t from-red-500 to-red-700 btn-sm">X</label>
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