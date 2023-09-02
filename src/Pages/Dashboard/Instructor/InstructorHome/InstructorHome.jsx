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
                <p className='uppercase text-4xl text-center py-4 font-bold'>Instructor Profile</p>
            </div>
            <div>
                <div className="hero">
                    <div className="hero-content w-full">
                        <div className="card  w-full shadow-2xl border-4">
                            <form onSubmit={handleUpdate}>
                                <div className='flex'>
                                    <div className='card-body'>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                                <input type="text" placeholder="Name" id='name' required value={instructor[0]?.name} className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Age</span>
                                                <input type="number" placeholder="Age" id='age' value={instructor[0]?.age} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Experience</span>
                                                <input type="text" placeholder="Experience (Years)" id='experience' value={instructor[0]?.experience} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Class Name</span>
                                                <input type="text" value={instructor[0]?.className || instructor[0]?.category} placeholder="Class Name" id='className' required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Photo URL</span>
                                                <input type="text" placeholder="Photo URL" id='photo' value={instructor[0]?.photoURL || instructor[0]?.imageURL} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Skills</span>
                                                <input type="text" placeholder="Skills" id='skill' value={instructor[0]?.skill} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">
                                                    Description
                                                </span>
                                                <input type="text" placeholder="Description" value={instructor[0]?.description} id='description' required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                                <input type="email" placeholder="Email" id='email' value={instructor[0]?.email} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Contact No.</span>
                                                <input type="text" placeholder="Contact No." id='contact' value={instructor[0]?.contact} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                                <input type="text" placeholder="Address" id='address' value={instructor[0]?.address} required className="input ms-2 input-bordered" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-control my-6">
                                    <button className="btn btn-primary w-[30%] mx-auto">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorHome;