import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";

const Registration = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL, data?.contact, data?.address)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photo: data.photoURL, contact: data?.contact, address: data?.address }
                        fetch('https://champions-development-academy-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <>
            <Helmet>
                <title>Registration | Champion's Development academy</title>
            </Helmet>
            <div style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/2140.jpg")' }} className="bg-center bg-cover min-h-screen bg-black bg-opacity-85 ">
                <div className="md:hero-content flex-col md:p-2">
                    <h1 className="md:text-xl md:w-[55%] bg-sky-600 font-semibold py-2 text-white"><span className='bg-red-700 px-4 me-4'> </span> Sign Up</h1>
                    <div className="md:card dark:border-2 py-4 md:px-0 px-2  mx-auto dark:text-white md:w-[55%] w-[80%]  bg-gradient-to-t from-zinc-700 shadow-xl">
                        <form onSubmit={handleSubmit(onSubmit)} className=" py-2 rounded-xl my-[-6px] ">
                            <div className="form-control space-y-0 mt-[-4px]">
                                <label className="label">
                                    <span className="label-text text-white">Name<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered md:input-md input-sm text-xs md:text-md" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control space-y-0 mt-[-10px]">
                                <label className="label">
                                    <span className="label-text text-white">Photo URL<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered md:input-md input-sm text-xs md:text-md" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control form-control space-y-0 mt-[-12px]">
                                <label className="label">
                                    <span className="label-text text-white">Email<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered md:input-md input-sm text-xs md:text-md" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control form-control space-y-0 mt-[-12px]">
                                <label className="label">
                                    <span className="label-text text-white">Contact No.(Optional)</span>
                                </label>
                                <input type="text"  {...register("contact")} name="contact" placeholder="Contact No." className="input input-bordered md:input-md input-sm text-xs md:text-md" />

                            </div>
                            <div className="form-control form-control space-y-0 mt-[-12px]">
                                <label className="label">
                                    <span className="label-text text-white">Address(Optional)</span>
                                </label>
                                <input type="text"  {...register("address")} name="address" placeholder="Address" className="input input-bordered md:input-md input-sm text-xs md:text-md" />

                            </div>
                            <div className="form-control form-control space-y-0 mt-[-12px]">
                                <label className="label">
                                    <span className="label-text text-white">Password<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered md:input-md input-sm text-xs md:text-md" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}

                            </div>
                            <div className="form-control form-control space-y-0 mt-2">
                                <input className="btn md:btn-md btn-sm bg-gradient-to-r from-red-400 to-blue-400 text-sm md:text-md" type="submit" value="Sign Up" />
                            </div>
                            <p className="space-y-0 py-2 mx-auto mt-[-8px] text-white text-sm md:text-md">Already have an account? <span className="text-blue-500"> <Link to="/login">Login</Link></span></p>
                            <div className="mx-auto"><SocialLogin></SocialLogin></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;