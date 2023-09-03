import { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('https://champions-development-academy-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div className="">
            <p className="px-4 text-lg font-bold">Or Login With</p>
            <div className="divider"></div>
            <div className="w-full border-2 py-4 rounded-2xl text-center my-4 mb-8 gap-4 flex justify-center">
                <button onClick={handleGoogleSignIn} className="btn  text-3xl btn-outline bg-blue-400">
                    <p className="px-6 text-red-600 "><FaGoogle></FaGoogle></p>
                </button>
                <button  className="btn text-red-600 text-3xl btn-outline bg-blue-400">
                    <p className="px-6 disabled text-blue-700"><FaFacebook></FaFacebook></p>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;