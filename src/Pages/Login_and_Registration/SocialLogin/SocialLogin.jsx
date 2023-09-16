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
        <div className="">
            <p className="px-4 text-lg font-bold">Or Login With</p>
            {/* <div className="divider"></div> */}
            <div className="w-full border-0 py-2 rounded-2xl text-center my-4 mb-8 gap-8 flex justify-evenly">
                <button onClick={handleGoogleSignIn} className="btn  text-3xl btn-outline bg-blue-400">
                    <p className="px-6 text-red-600 "><FaGoogle></FaGoogle></p>
                </button>
                <button onClick={handleFacebookLogin} className="btn text-red-600 text-3xl btn-outline bg-blue-400">
                    <p className="px-6 disabled text-blue-700"><FaFacebook></FaFacebook></p>
                </button>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default SocialLogin;
