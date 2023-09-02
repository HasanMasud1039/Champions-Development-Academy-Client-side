import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const AddClass = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [axiosSecure] = useAxiosSecure();

    const handleSubmitForm = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const availableSeats = form.seats.value;
        const classImage = form.imageURL.value;
        const price = form.price.value;
        const instructorPhoneNumber = form.contact.value;
        const instructorName = user.displayName;
        const instructorPhoto = user?.photoURL;
        const instructorEmail = user.email;

        const addClassInfo = { className, instructorName, instructorEmail, availableSeats, instructorPhoto, price, instructorPhoneNumber, classImage };
        console.log(addClassInfo);

        axiosSecure
            .post("/users/instructor/class", addClassInfo)
            .then((data) => {
                console.log("Add New Class", data.data);
                if (data.data.acknowledged) {

                    toast.success('Class Added Successfully')
                }
                navigate('/dashboard/myClasses');             
            });
    }


    return (
        <div>
            <Helmet>
                <title>Add Classes | Champion's Development academy</title>
            </Helmet>
            <p className='uppercase text-4xl text-center py-4 font-bold'>Add a Class</p>
            <div>
                <div className="hero">
                    <div className="hero-content w-full">
                        <div className="card  w-full shadow-2xl border-4">
                            <form onSubmit={handleSubmitForm}>
                                <div className='flex'>
                                    <div className='card-body'>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Class Name</span>
                                            </label>
                                            <input type="text" placeholder="Class Name" id='className' required className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Instructor Name</span>
                                            </label>
                                            <input type="text" value={user?.displayName} readOnly className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Instructor Email</span>
                                            </label>
                                            <input type="email" value={user?.email} readOnly className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Available Seats</span>
                                            </label>
                                            <input type="number" required placeholder="available Seats" id='seats' className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Price</span>
                                            </label>
                                            <input type="number" required placeholder="Price" id='price' className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Instructors Contact No.</span>
                                            </label>
                                            <input type="text" required placeholder="Contact No." id='contact' className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Class Image URL</span>
                                            </label>
                                            <input type="text" required placeholder="Class Image" id='imageURL' className="input input-bordered" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-control my-6">
                                    <button className="btn btn-primary w-[30%] mx-auto">Add Class</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default AddClass;