import React, { useContext } from 'react';
import { FaChalkboardTeacher, FaHome, FaListAlt, FaMoon, FaSlidersH, FaSun, FaUser, FaUserAlt } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';
import { useEffect } from 'react';
import { useState } from 'react';
import navImage from '../../assets/spo.png'
import './Navbar.css'

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

    const handleThemeLight = () => {
        setTheme(theme === "dark" ? "light" : "light");
    };
    const handleThemeDark = () => {
        setTheme(theme === "light" ? "dark" : "dark");
    };



    return (
        <div className='relative'>
            <div className="navbar py-2 md:h-[90px] bg-[#1F2764] md:bg-white md:dark:bg-slate-800 dark:text-white text-white md:text-black">
                <div className="navbar-start w-[20%] ms-[-8px]">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-xl lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 bg-opacity-90 rounded-box w-40">
                            <div className=' text-2xl space-y-2  font-serif text-black font-bold'>
                                <li><NavLink className={({ isActive }) =>
                                    isActive ? "active" : ""} to='/'><FaHome />Home</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive ? "active" : ""} to='/about'><FaHome />About</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive ? "active" : ""} to='/allClasses'><FaListAlt />Classes</NavLink></li>
                                <li><NavLink className={({ isActive }) =>
                                    isActive ? "active" : ""} to='/instructors'><FaChalkboardTeacher />Instructors</NavLink></li>
                                {
                                    user ?
                                        <>
                                            <li><NavLink to='/dashboard'><FaSlidersH /> Dashboard</NavLink></li>
                                            <li><a onClick={handleLogOut}><IoIosLogOut /> Logout</a></li></>

                                        : <></>
                                }
                                <div className='flex gap-2  rounded-3xl ms-4  text-sm hover:text-red-400  '>
                                    {
                                        theme == "dark" ?
                                            <FaSun className='md:text-3xl text-yellow-500 text-lg' onClick={handleThemeLight} type="checkbox" />
                                            :
                                            <FaMoon className='md:text-3xl text-black text-lg' onClick={handleThemeDark} type="checkbox" />
                                    }
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="w-full">
                    <img className=' h-18 w-[60%] MS md:block hidden' src='https://i.ibb.co/LY0T3Wj/CDA33-prev-ui.png' alt="" />
                    <p className='p-2  font-serif text-sm text-center font-semibold block md:hidden dark:text-[#B7F8F1]'>Champion's Development Academy</p>


                </div>
                <div className="navbar-end justify-end ">
                    <ul className="menu menu-horizontal px-8 pt-2 hidden lg:flex dark:text-white">
                        <div className=' text-xl font-serif text-slate-500  flex justify-evenly gap-4 '>
                            <a className='rounded-2xl  hover:text-red-400  '><NavLink to='/' className={({ isActive }) =>
                                isActive ? "active" : ""}>Home</NavLink></a>
                            <a className='rounded-2xl  hover:text-red-400  '><NavLink to='/about' className={({ isActive }) =>
                                isActive ? "active" : ""}>About</NavLink></a>
                            <a className='rounded-2xl  hover:text-red-400  '><NavLink to='/allClasses' className={({ isActive }) =>
                                isActive ? "active" : ""}>Classes</NavLink></a>
                            <a className='rounded-2xl  hover:text-red-400  '><NavLink to='/instructors' className={({ isActive }) =>
                                isActive ? "active" : ""}>Instructors</NavLink></a>
                            {
                                user ?
                                    <a className=' hover:text-red-400 '><NavLink to='/dashboard' className={({ isActive }) =>
                                        isActive ? "active" : ""}>Dashboard</NavLink></a>
                                    : <></>
                            }
                            <div className='flex gap-2  rounded-3xl ms-4  hover:text-red-400  '>
                                {
                                    theme == "dark" ?
                                        <FaSun className='md:text-3xl text-yellow-500 text-lg' onClick={handleThemeLight} type="checkbox" />
                                        :
                                        <FaMoon className='md:text-3xl text-black text-lg' onClick={handleThemeDark} type="checkbox" />
                                }
                            </div>
                        </div>
                    </ul>
                    <div className="navbar flex justify-end w-[15%]">
                        <div className="dropdown dropdown-end md:pe-4">
                            <label tabIndex={0} className="md:btn-lg btn-info btn-outline btn-circle avatar ">
                                <div className="md:text-6xl text-5xl md:border-4 border-2 dark:text-white  text-slate-900 rounded-full">
                                    {
                                        user?.email ? <img src={user.photoURL} alt="USER" />
                                            : <NavLink to='/login'><FaUserAlt className='text-slate-400 hover:bg-cyan-500'></FaUserAlt></NavLink>
                                    }
                                </div>
                            </label>
                            {
                                user ?
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white z-[1]  p-2 text-black shadow  rounded-box md:w-52 w-48 absolute top-0 right-30 opacity-25">
                                        {
                                            isAdmin ? <>

                                                <li><NavLink to='/dashboard/adminHome'>My Profile</NavLink></li>
                                                <li><NavLink to='/dashboard/adminHome'>Edit Profile</NavLink></li>
                                            </> :
                                                isInstructor ? <>
                                                    <li><NavLink to='/dashboard/instructorHome'>My Profile</NavLink></li>
                                                    <li><NavLink to='/dashboard/instructorHome'>Edit Profile</NavLink></li>
                                                </>
                                                    : <>
                                                        <li><NavLink to='/dashboard/userHome'>My Profile</NavLink></li>
                                                        <li><NavLink to='/dashboard/userHome'>Edit Profile</NavLink></li>
                                                    </>
                                        }
                                        <li><a onClick={handleLogOut}>Logout</a></li>
                                    </ul> : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;