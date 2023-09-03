import React, { useContext } from 'react';
import { FaUser, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';
import { useEffect } from 'react';
import { useState } from 'react';

const Navbar = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user, logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(null);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    //dark
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        console.log("clicked")
        setTheme(theme === "dark" ? "light" : "dark");
    };


    return (
        <div>

            <div className="navbar md:bg-base-100 bg-black text-white md:text-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-lg lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <div className=' text-2xl font-serif text-slate-600 className="dropdown dropdown-end w-[80%] space-y-2  justify-end"'>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/allClasses'>Classes</Link></li>
                                <li><Link to='/instructors'>Instructors</Link></li>
                                {
                                    user ?
                                        <li><Link to='/dashboard'>Dashboard</Link></li>
                                        : <></>
                                }
                            </div>
                        </ul>
                    </div>
                    <div className=" border-3 w-full ">
                        <img className=' h-20 w-[80%] md:block hidden' src="/public/CDA33.PNG" alt="" />
                        <p className='p-3  font-serif text-sm text-center font-semibold block md:hidden'>Champion's Development Academy</p>


                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 border-2 px-6 pt-4  bg-cyan-100 rounded-t-3xl">
                        <div className=' text-2xl font-serif text-slate-600  flex justify-evenly gap-4 '>
                            <a className='rounded-2xl  hover:text-black  '><Link to='/'>Home</Link></a>
                            <a className='rounded-2xl  hover:text-black '><Link to='/allClasses'>Classes</Link></a>
                            <a className='rounded-2xl  hover:text-black '><Link to='/instructors'>Instructors</Link></a>
                            {
                                user ?
                                    <a className=' hover:text-black'><Link to='/dashboard'>Dashboard</Link></a>
                                    : <></>
                            }
                            <div className='flex gap-2  rounded-3xl ms-4  hover:text-black '>Dark                             
                                <input role='switch' id='black' defaultChecked onClick={handleThemeSwitch} type="checkbox" className="toggle px-4 " />
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end md:pe-4">
                        <label tabIndex={0} className="btn-lg btn-info btn-outline btn-circle avatar ">
                            <div className="text-6xl border-4  text-slate-400 rounded-full">

                                {
                                    user?.email ? <img src={user.photoURL} alt="" />
                                        : <Link to='/login'><FaUserAlt></FaUserAlt></Link>
                                }
                            </div>
                        </label>
                        {
                            user ?
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 text-black shadow bg-base-100 rounded-box w-52">

                                    {
                                        isAdmin ? <>

                                            <li><Link to='/dashboard/adminHome'>My Profile</Link></li>
                                            <li><Link to='/dashboard/adminHome'>Edit Profile</Link></li>
                                        </> :
                                            isInstructor ? <>
                                                <li><Link to='/dashboard/instructorHome'>My Profile</Link></li>
                                                <li><Link to='/dashboard/instructorHome'>Edit Profile</Link></li>
                                            </>
                                                : <>
                                                    <li><Link to='/dashboard/userHome'>My Profile</Link></li>
                                                    <li><Link to='/dashboard/userHome'>Edit Profile</Link></li>
                                                </>
                                    }
                                    <li><a onClick={handleLogOut}>Logout</a></li>
                                </ul> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;