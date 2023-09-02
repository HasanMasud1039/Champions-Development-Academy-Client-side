/* eslint-disable no-unused-vars */
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../Components/SectionTitle';
import { FaBriefcase } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const Instructors = () => {
    const instructors = useLoaderData();
    console.log(instructors)
    return (
        <div>
                        <Helmet>
                <title>Instructors | Champion's Development academy</title>
            </Helmet>
            <div className='py-4'>
                <SectionTitle subheading="Have a Look" heading="Our Instructors"></SectionTitle>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-4 p-4'>
                    {instructors.map(instructor =>
                        <div className="card md:w-[90%] bg-base-100 shadow-xl border-4">
                            <figure><img className='w-full h-[250px] md:h-[350px]' src={instructor?.imageURL || instructor?.photo} alt="Instructor" /></figure>
                            <div className="card-body">
                                <h2 className="card-title font-bold text-lg md:text-2xl">
                                    {instructor?.name}

                                </h2>
                                <div className="card-actions justify-start ">
                                    <p className='md:text-xl text-lg'>{instructor?.category}</p>

                                    {/* <div className="badge badge-outline text-lg p-4 gap-2 font-bold"><FaBriefcase></FaBriefcase> {instructor.experience} </div> */}
                                </div>

                                {/* Put this part before </body> tag */}

                            </div>


                            {/* The button to open modal */}
                            <label htmlFor={instructor._id} className="btn mx-auto my-4 btn-sm btn-outline bg-fuchsia-600 text-white ">Details</label>

                            {/* Put this part before </body> tag */}
                            <input type="checkbox" id={instructor._id} className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box grid grid-cols-2 gap-4">
                                    <div>
                                        <img className='rounded-lg mb-4 w-full h-[250px]' src={instructor?.imageURL || instructor?.photo} alt="" />
                                        <p className="font-bold text-xl mb-2">{instructor?.name }</p>
                                        <p> <span className='font-bold'>Age: </span>{instructor?.age} years</p>
                                        <p> <span className='font-bold'>Experience: </span> {instructor?.experience}</p>
                                    </div>
                                    <div>

                                        <h3 className="font-bold text-lg">{instructor?.category}</h3>
                                        <h3 ><span className='font-bold'>Skills: </span>{instructor?.skill}</h3>
                                        <p className="py-4">{instructor?.description}</p>
                                        <p> <span className='font-bold'>Email: </span> {instructor?.email || instructor?.email}</p>
                                        <p> <span className='font-bold'>Contact: </span> {instructor?.contact}</p>
                                        <p> <span className='font-bold'>Address: </span> {instructor?.address}</p>
                                        <div className="modal-action">
                                            <label htmlFor={instructor?._id} className="btn">Close!</label>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    )}
                </div>

            </div >
        </div>
    );
};

export default Instructors;