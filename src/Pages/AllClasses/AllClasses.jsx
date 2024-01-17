import React, { useContext, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAdmin from '../../Hooks/useAdmin';
import { Helmet } from 'react-helmet';
import { Toaster, toast } from 'react-hot-toast';
import { Result } from 'postcss';
import { useSpring } from '@react-spring/web';
import AOS from 'aos';
import { FaChalkboardTeacher, FaEnvelope, FaPhone } from 'react-icons/fa';
import useInstructor from '../../Hooks/useInstructor';

const AllClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const allClasses = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const email = user?.email;

    const springs = useSpring({
        from: { x: 300 },
        to: { x: 50 },
    });
    

    const handleAddToCart = item => {
        const { _id, Status, availableSeats, classImage, className, instructorEmail, instructorName, instructorPhoneNumber, instructorPhoto, price } = item;
        const newId = _id;
        const newItem = { newId, Status, availableSeats, classImage, className, instructorEmail, instructorName, instructorPhoneNumber, instructorPhoto, price, email };
        console.log(newItem);
        if (user) {
            axiosSecure
                .post("/select/classes", newItem)
                .then((data) => {
                    console.log(data);
                    // toast.success("Your selected class was successfully added");
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Your selected class was successfully added",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    else {
                        Swal.fire({
                            title: "Already Selected",
                            text: "You cannot add this item more than once.",
                            icon: "error",
                        })
                    }
                });
        }
        else {
            Swal.fire({
                title: "Please Login!",
                text: "You cannot select this class.",
                icon: "error",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login');
                }
                else {
                    navigate('/allClasses');
                }
            })
        }
    }
    return (
        <div>
            <Toaster></Toaster>
            <Helmet>
                <title>All Classes | Champion's Development academy</title>
            </Helmet>
            <div className='py-4'>
                <SectionTitle subheading="Have a look" heading="Our Classes"></SectionTitle>
                <div className='grid md:grid-cols-3 grid-cols-1 md:gap-y-4 gap-0'>
                    {allClasses ? allClasses.map(allClass =>
                        <div data-aos="fade-down"  className="card md:w-[90%] shadow-xl rounded-none border-2 bg-gradient-to-b from-sky-400 dark:bg-black dark:text-white">
                            <figure><img className='w-full md:h-[350px] h-[250px]' src={allClass.classImage} alt="Instructor" /></figure>
                            <div className="card-body px-3 md:mt-4">
                                <h2 className="card-title font-bold md:text-xl text-lg">
                                    {allClass.className}
                                </h2>
                                <div>
                                    <div className='md:divider'></div>
                                    <div className='md:flex justify-between'>
                                        <p>Available Seats: <span className='font-bold'>{allClass.availableSeats}</span></p>
                                        <p>Price: <span className='font-bold'>${allClass.price}</span></p>
                                    </div>
                                    <div className='md:flex md:justify-between md:border-t-2 md:p-1 my-2'>
                                        <div className='mt-2'>
                                            <p className='flex gap-2 items-center text-lime-400'><FaChalkboardTeacher/>  <span className='font-semibold dark:text-white text-black'>{allClass.instructorName}</span></p>
                                            <p className='flex gap-2 items-center text-rose-400'><FaEnvelope/> <span className='dark:text-white text-black'>{allClass.instructorEmail}</span></p>
                                            <p className='flex gap-2 items-center text-teal-400'><FaPhone/> <span className='dark:text-white text-black'>{allClass.instructorPhoneNumber}</span></p>
                                        </div>
                                        <div>
                                            <img className="w-20 h-20 mt-2 rounded-xl md:block hidden" src={allClass.instructorPhoto} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isAdmin || isInstructor ?
                                    <button onClick={() => handleAddToCart(allClass)} disabled className='btn btn-primary m-4'>Select</button>

                                    :
                                    <button onClick={() => handleAddToCart(allClass)} className='btn md:btn-md bg-gradient-to-t from-teal-500 to-blue-700 text-white  btn-sm m-6'>Select</button>
                            }
                        </div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
};

export default AllClasses;