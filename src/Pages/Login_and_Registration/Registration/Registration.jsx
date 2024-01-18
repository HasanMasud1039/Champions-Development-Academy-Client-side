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
                        <form onSubmit={handleSubmit(onSubmit)} className=" py-2 rounded-xl my-[-6px] space-y-[-12px]">
                            <div className="form-control md:grid grid-cols-4 space-y-[-4px] mt-[-8px]">
                                <label className="label">
                                    <span className="label-text text-white ">Name<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <div className="col-span-3 ">
                                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="📛 Name" className="input input-bordered md:input-md input-sm text-xs md:text-md rounded-none" />
                                    {errors.name && <span className="text-red-600 text-xs">Name is required</span>}
                                </div>
                            </div>
                            <div className="form-control md:grid grid-cols-4 space-y-0 mt-[-6px]">
                                <label className="label">
                                    <span className="label-text text-white ">Photo URL<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <div className="col-span-3">
                                    <input type="text"  {...register("photoURL", { required: true })} placeholder="📸 Photo URL" className="input input-bordered md:input-md input-sm text-xs md:text-md rounded-none " />
                                    {errors.photoURL && <span className="text-xs text-red-600">Photo URL is required</span>}
                                </div>
                            </div>
                            <div className="form-control md:grid grid-cols-4 space-y-0 mt-[-8px]">
                                <label className="label">
                                    <span className="label-text text-white ">Email<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <div className="col-span-3">
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="✉️ Email" className="input input-bordered md:input-md input-sm text-xs md:text-md rounded-none" />
                                    {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                                </div>
                            </div>
                            <div className="form-control md:grid grid-cols-4 space-y-0 mt-[-8px]">
                                <label className="label">
                                    <span className="label-text text-white ">Contact No.</span>
                                </label>
                                <div className="col-span-3">
                                <input type="text"  {...register("contact")} name="contact" placeholder="📞 Contact No." className="input input-bordered md:input-md input-sm text-xs md:text-md rounded-none " />
                                </div>

                            </div>
                            <div className="form-control md:grid grid-cols-4 space-y-0 mt-[8px]">
                                <label className="label">
                                    <span className="label-text text-white ">Address</span>
                                </label>
                                <div className="col-span-3">
                                <input type="text"  {...register("address")} name="address" placeholder="🏠 Address" className="input input-bordered md:input-md input-sm text-xs md:text-md rounded-none " />
                                </div>
                            </div>
                            <div className="form-control md:grid grid-cols-4 space-y-0 mt-[8px]">
                                <label className="label">
                                    <span className="label-text text-white ">Password<span className='text-lg text-red-600'> *</span></span>
                                </label>
                                <div className="col-span-3">
                                    <input type="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} placeholder="🔐 password" className="input input-bordered md:input-md input-sm text-xs md:text-md rounded-none" />
                                    {errors.password?.type === 'required' && <p className="text-red-600 text-xs">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600 text-xs">Password must be 6 characters</p>}
                                    {errors.password?.type === 'maxLength' && <p className="text-red-600 text-xs">Password must be less than 20 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600 text-xs">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                </div>

                            </div>
                            <div className="form-control">
                                <input className="btn mt-4 md:btn-md w-[40%] mx-auto btn-sm bg-gradient-to-r from-red-400 to-blue-400 text-sm" type="submit" value="Sign Up" />
                            </div>
                            <p className="space-y-0 py-2 mx-auto mt-[-8px] text-white text-sm md:text-md">Already have an account? <span className="text-blue-500"> <Link to="/login">Login</Link></span></p>
                            <div className="mx-auto pt-4"><SocialLogin></SocialLogin></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;