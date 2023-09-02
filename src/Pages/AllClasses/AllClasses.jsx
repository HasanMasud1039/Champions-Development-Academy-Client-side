import React, { useContext, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAdmin from '../../Hooks/useAdmin';
import { Helmet } from 'react-helmet';
import { Toaster, toast } from 'react-hot-toast';

const AllClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const allClasses = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const email = user?.email;

    const handleAddToCart = item => {
        const { _id, Status, availableSeats, classImage, className, instructorEmail, instructorName, instructorPhoneNumber, instructorPhoto, price } = item;
        const newId = _id;
        const newItem = {newId, Status, availableSeats, classImage, className, instructorEmail, instructorName, instructorPhoneNumber, instructorPhoto, price, email };
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
    }
    return (
        <div>
            <Toaster></Toaster>
            <Helmet>
                <title>All Classes | Champion's Development academy</title>
            </Helmet>
            <div className='py-4'>
                <SectionTitle subheading="Have a look" heading="Our Classes"></SectionTitle>
                <div className='grid md:grid-cols-3 grid-cols-2 md:gap-2'>
                    {allClasses ? allClasses.map(allClass =>
                        <div className="card md:w-[90%] bg-base-100 shadow-xl border-4">
                            <figure><img className='w-full md:h-[350px] h-[250px]' src={allClass.classImage} alt="Instructor" /></figure>
                            <div className="card-body md:mt-4">
                                <h2 className="card-title font-bold md:text-xl text-lg">
                                    {allClass.className}
                                </h2>
                                <div>
                                    <div className='divider'></div>
                                    <div className='md:flex justify-between'>
                                        <p>Available Seats: <span className='font-bold'>{allClass.availableSeats}</span></p>
                                        <p>Price: <span className='font-bold'>${allClass.price}</span></p>
                                    </div>
                                    <div className='md:flex md:justify-between md:font-semibold md:border-2 md:p-1 my-2 rounded-xl'>
                                        <div >
                                            <p>Instructor: <span className='font-bold'>{allClass.instructorName}</span></p>
                                            <p className='md:block hidden'>Email: <span className='font-bold'>{allClass.instructorEmail}</span></p>
                                            <p className='md:block hidden'>Phone: <span className='font-bold'>{allClass.instructorPhoneNumber}</span></p>
                                        </div>
                                        <div>
                                            <img className="w-20 h-20 mt-2 rounded-full" src={allClass.instructorPhoto} alt="" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {
                                isAdmin ?
                                    <button onClick={() => handleAddToCart(allClass)} disabled className='btn btn-primary m-4'>Select</button>

                                    :
                                    <button onClick={() => handleAddToCart(allClass)} className='btn btn-primary m-6'>Select</button>
                            }
                        </div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
};

export default AllClasses;