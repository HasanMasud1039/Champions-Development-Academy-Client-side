import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useInstructor from '../../../../Hooks/useInstructor';
import { useQuery } from '@tanstack/react-query';
import { handler } from 'daisyui';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const InstructorHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const { data: instructor = [] } = useQuery({
        queryKey: ["email", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/classes/instructor/${user.email}`
            );
            console.log(res.data);

            return res.data;
        },
    });
    console.log(instructor[0]);

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const className = form.className.value;
        const description = form.description.value;
        const experience = form.experience.value;
        const age = form.age.value;
        const contact = form.contact.value;
        const name = form.name.value;
        const imageURL = form.photo.value;
        const email = user.email;
        const address = form.address.value;
        const skill = form.skill.value;

        const instructorData = { name, email, className, age, experience, description, imageURL, contact, address, skill };

        console.log(instructorData);

        axiosSecure.patch("/classes/instructor", { email, instructorData }).then((res) => {
            console.log("instrData", res.data);

            Swal.fire({
                title: 'Update Profile Successful.',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            navigate('/dashboard');
        });
    }

    return (
        <div>
            <Helmet>
                <title>Instructor Home | Champion's Development academy</title>
            </Helmet>
            <div>
                <p className='uppercase md:text-4xl md:text-center py-4 font-bold dark:text-white'>Instructor Profile</p>
            </div>
            <div className="hero">
                    <div className="md:hero-content md:w-full   w-[99%]">
                        <div className="card  md:w-full w-[60%] shadow-2xl bg-slate-300  dark:bg-black dark:text-white border-4">
                            <form onSubmit={handleUpdate} className="md:card-body  w-[80%]">
                                <div className='flex w-full bg-slate-200  dark:bg-black dark:text-white rounded-xl'>
                                    <div className='card-body w-[60%] md:w-full'>
                                        <div className="form-control  ">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Name</span>
                                            </label>
                                            <input type="text" placeholder="Name" id='name' required value={instructor[0]?.name} className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Age</span>
                                            </label>
                                            <input type="number" placeholder="Age" id='age' value={instructor[0]?.age} required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Experience</span>
                                            </label>
                                            <input type="text" placeholder="Experience (Years)" id='experience' value={instructor[0]?.experience} required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Class Name</span>
                                            </label>
                                            <input type="text" value={instructor[0]?.className || instructor[0]?.category} placeholder="Class Name" id='className' required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Photo URL</span>
                                            </label>
                                            <input type="text" placeholder="Photo URL" id='photo' value={instructor[0]?.photoURL || instructor[0]?.imageURL} required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Skills</span>
                                            </label>
                                            <input type="text" placeholder="Skills" id='skill' value={instructor[0]?.skill} required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">
                                                    Description
                                                </span>
                                            </label>
                                            <input type="text" placeholder="Description" value={instructor[0]?.description} id='description' required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Email</span>
                                            </label>
                                            <input type="email" placeholder="Email" id='email' value={instructor[0]?.email} required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Contact No.</span>
                                            </label>
                                            <input type="text" placeholder="Contact No." id='contact' value={instructor[0]?.contact} required className="input ms-2 input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text dark:text-white">Address</span>
                                            </label>
                                            <input type="text" placeholder="Address" id='address' value={instructor[0]?.address} required className="input ms-2 input-bordered" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-control my-4">
                                    <button className="btn btn-primary md:w-[40%] w-[60%]  md:text-md text-sm px-2  mx-auto">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
           
            </div>
        </div>
    );
};

export default InstructorHome;