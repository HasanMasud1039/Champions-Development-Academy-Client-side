import { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FacebookAuthProvider, getAuth, getRedirectResult, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

const SocialLogin = () => {
    const auth = getAuth();
    const { googleSignIn } = useContext(AuthContext);
    const { facebookSignIn } = useContext(AuthContext);
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
                    toast.success("Google Login Successful");
            })
    }

     const handleFacebookLogin = () => {
        // getRedirectResult(auth)
        facebookSignIn()
        .then(result => {
            const loggedInUser = result.user;
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
                toast.success("Facebook Login Successful");
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
        
            // ...
          });
    }

    return (
        <div className="space-y-0">
            <p className="md:text-md text-sm text-white font-semibold md:font-semibold">Or Login With</p>
            <div className="w-full border-0 py-1 rounded-2xl text-center   md:gap-6 gap-0 md:flex justify-evenly">
                <button onClick={handleGoogleSignIn} className="btn md:btn-md btn-sm btn-outline  bg-red-600">
                    <p className=" md:px-4 px-2 py-2 text-white flex items-center gap-4">Login with <FaGoogle className="md:text-2xl"/></p>
                </button>
                <button onClick={handleFacebookLogin} className="btn bg-blue-600 md:btn-md btn-sm btn-outline ">
                    <p className=" md:px-4 px-2 py-2 text-white flex items-center gap-4">Login with <FaFacebook className="md:text-3xl"/></p>
                </button>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default SocialLogin;