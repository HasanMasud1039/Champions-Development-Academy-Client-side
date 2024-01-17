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
            <div className="hero mt-4 relative">
                <div className="md:hero-content md:w-full w-[98%]">
                    <div className="card md:w-[80%] w-[70%] shadow-xl bg-zinc-200 dark:bg-zinc-700 rounded-none dark:text-white">
                        <label className='absolute top-[-16px] w-full bg-red-800 text-white py-3 px-4 uppercase font-semibold'><span className="border-cyan-400 border-4 me-4"/>Instructor Profile</label>
                        <form onSubmit={handleUpdate} className="md:card-body space-y-0">
                            <div className='flex w-full dark:text-white rounded-xl'>
                                <div className='ps-4 w-[60%] md:w-full md:mt-[-30px]'>
                                    <img src={instructor[0]?.imageURL} alt="Instructor" className='w-24 h-24 rounded-tl-xl rounded-br-xl mx-auto' />
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Name</span>
                                        </label>
                                        <input type="text" placeholder="Name" id='name' required value={instructor[0]?.name} className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Age</span>
                                        </label>
                                        <input type="number" placeholder="Age" id='age' defaultValue={instructor[0]?.age} required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Experience</span>
                                        </label>
                                        <input type="text" placeholder="Experience (Years)" id='experience' defaultValue={instructor[0]?.experience} required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Category</span>
                                        </label>
                                        <input type="text" defaultValue={instructor[0]?.className || instructor[0]?.category} placeholder="eg: Cricket Instructor" id='className' required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Photo URL</span>
                                        </label>
                                        <input type="text" placeholder="Photo URL" id='photo' defaultValue={instructor[0]?.photoURL || instructor[0]?.imageURL} required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Skills</span>
                                        </label>
                                        <input type="text" placeholder="Skills" id='skill' defaultValue={instructor[0]?.skill} required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">
                                                Description
                                            </span>
                                        </label>
                                        <input type="text" placeholder="Description" defaultValue={instructor[0]?.description} id='description' required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Email</span>
                                        </label>
                                        <input type="email" placeholder="Email" id='email' value={instructor[0]?.email} required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Contact No.</span>
                                        </label>
                                        <input type="text" placeholder="Contact No." id='contact' defaultValue={instructor[0]?.contact} required className="input ms-2 input-bordered" />
                                    </div>
                                    <div className="form-control my-[-16px] ">
                                        <label className="label">
                                            <span className="label-text dark:text-white">Address</span>
                                        </label>
                                        <input type="text" placeholder="Address" id='address' defaultValue={instructor[0]?.address} required className="input ms-2 input-bordered" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-control md:ms-auto ms-16 mx-auto">
                                <button className="btn text-white md:w-full w-[40%] bg-gradient-to-t from-red-500 to-red-800 mt-4 md:text-md text-sm md:px-4">Update Profile</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InstructorHome;