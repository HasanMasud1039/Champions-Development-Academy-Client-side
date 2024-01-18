import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import SocialLogin from '../SocialLogin/SocialLogin';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';


const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => toast.error('Try Again!')
                // Swal.fire({
                //     title: 'Try Again.',
                //     showClass: {
                //         popup: 'animate__animated animate__fadeInDown'
                //     },
                //     hideClass: {
                //         popup: 'animate__animated animate__fadeOutUp'
                //     }
                // })
            )
    }
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Login | Champion's Development academy</title>
            </Helmet>
            <div style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/2140.jpg")' }} className="bg-center bg-cover min-h-screen bg-black bg-opacity-85">
                <div className="md:hero-content md:w-[60%] mx-auto flex flex-col items-center justify-center h-screen">
                    <h1 className="md:text-xl w-full md:w-[72%] bg-sky-600 font-semibold py-2 text-white"><span className='bg-red-700 px-4 me-4'> </span> Login</h1>
                    <div className="md:card py-2 mx-auto text-white md:w-[90%] w-full">
                        <form onSubmit={handleLogin} className="md:px-8 px-2 py-4 rounded-xl w-[80%]  mt-[-8px]  bg-gradient-to-t from-zinc-700 shadow-xl">
                            <div className="form-control space-y-0 mt-[-4px]">
                                {/* <label className="label">
                                    <span className="label-text dark:text-white">Email</span>
                                </label> */}
                                <input type="email" name="email" placeholder="✉️ Email" className="input input-bordered md:input-md rounded-none input-sm text-xs md:text-md" />
                            </div>
                            <div className="form-control space-y-0 mt-[-12px]">
                                {/* <label className="label">
                                    <span className="label-text dark:text-white">Password</span>
                                </label> */}
                                <input type="password" name="password" placeholder="🔒 Password" className="input input-bordered md:input-md input-sm rounded-none text-xs md:text-md" />
                            </div>
                            <div className="form-control space-y-0 mt-[-8px]">
                                    <LoadCanvasTemplate reloadColor="red" reloadPosition="flex"/>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="🔐 Type the Captcha Above" className="input input-bordered rounded-none md:input-md input-sm text-xs md:text-md" />
                            </div>
                            <div className="form-control space-y-0 mt-2">
                                <input disabled={false} className="btn md:btn-md w-[60%] mx-auto btn-sm bg-gradient-to-r from-red-400 to-blue-400 text-sm" type="submit" value="Login" />
                            </div>
                            <p className='space-y-0 py-2 mx-auto mt-[-8px] text-white text-sm md:text-md'>New Here? <Link to="/registration"><span className='text-blue-500 text-md'>Create an account</span></Link> </p>
                            <div className='mx-auto'><SocialLogin></SocialLogin></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;