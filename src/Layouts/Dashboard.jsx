
import { NavLink, Outlet } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBook, FaCalendarAlt, FaClipboardList, FaCloudMoon, FaComment, FaCreditCard, FaEnvelope, FaFolderPlus, FaHamburger, FaHome, FaInbox, FaListAlt, FaMoon, FaShoppingBag, FaSun, FaThList, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import useSuperAdmin from '../Hooks/useSuperAdmin';

const Dashboard = () => {
    
    const [isSuperAdmin] = useSuperAdmin();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(null);
    const feedbacks = localStorage.getItem("feedbacks");

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };


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
        <div className="drawer drawer-mobile lg:drawer-open w-full h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content  py-4">
                <label htmlFor="my-drawer-2" className="btn btn-md bg-fuchsia-600 rounded-b-xl px-4 dark:text-white text-black  drawer-button lg:hidden">Dashboard</label>
                <div className='w-[95%] mx-auto dark:bg-black dark:text-white'><Outlet></Outlet></div>
            </div>
            <div className="drawer-side  w-[66%] md:w-[90%]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu md:p-4 p-1 md:w-72 w-[99%] h-full bg-gradient-to-r to-[#3F96EE]  from-blue-300">
                    <div className="uppercase text-sm md:text-lg text-sm font-serif space-y-2 md:font-bold font-semibold w-[90%] mb-6">
                        <label htmlFor="my-drawer-2" className=" absolute right-0 top-0 bg-transparent text-3xl text-red-800 p-1  drawer-button lg:hidden"><FaArrowAltCircleLeft></FaArrowAltCircleLeft> </label>
                        <div className="flex justify-between  md:w-full w-[60%]">
                            <img className="md:w-20 w-10 rounded-full md:block hidden" src='/public/cda2.PNG' alt="" />
                            <p className="md:text-xl text-sm font-serif md:ps-0 ps-2">Champions Development Academy</p>
                        </div>
                        <hr /><hr />
                        {
                            isSuperAdmin ? <div className='md:text-md text-xs'>
                                <li><NavLink to='/dashboard/SuperAdminHome'><FaHome className='text-red-500 text-lg' />Super Admin</NavLink></li>
                                <li><NavLink to='/dashboard/SuperClasses'><FaListAlt className='text-teal-500 text-lg' />All Classes</NavLink></li>
                                <li><NavLink to='/dashboard/SuperUsers'><FaUsers className='text-orange-500 text-lg'/>All Users</NavLink></li>
                          
                            </div> : isAdmin ? <div className='md:text-md text-xs'>
                                <li><NavLink to='/dashboard/adminHome'><FaHome className='text-red-500 text-lg' /> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/manageClasses'><FaListAlt className='text-teal-500 text-lg' /> Manage Classes</NavLink></li>
                                <li><NavLink to='/dashboard/manageUsers'><FaUsers className='text-orange-500 text-lg'/>Manage Users</NavLink></li>
                                {/* <li><NavLink to='/dashboard'><FaInbox></FaInbox>Inbox</NavLink></li> */}


                            </div> : isInstructor ? <div className='md:text-md text-xs'>

                                <li><NavLink to='/dashboard/instructorHome'><FaHome className='text-red-500 text-lg' /> Instructor Home</NavLink></li>
                                <li><NavLink to='/dashboard/addClass'><FaFolderPlus className='text-orange-500 text-lg' /> Add Class</NavLink></li>
                                <li><NavLink to='/dashboard/myClasses'><FaClipboardList className='text-teal-500 text-lg' /> My Classes</NavLink></li>
                                <li><NavLink to='/dashboard/instructorInbox'><FaInbox className='text-violet-600 text-lg' />Inbox <div className="badge badge-warning px-4 text-lg">{feedbacks}</div></NavLink></li>
                            </div> : <div className='md:text-md text-xs'>

                                <li><NavLink to='/dashboard/userHome'><FaHome className='text-red-500 text-lg' /> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/selectedClasses'><FaWallet className='text-teal-500 text-lg' />Selected Classes</NavLink></li>
                                <li><NavLink to='/dashboard/enrolledClasses'><FaThList className='text-orange-500 text-lg' />Enrolled Classes</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'><FaCreditCard className='text-violet-600 text-lg' />Payment History</NavLink></li>
                                {/* <li><NavLink to='/dashboard'><FaInbox></FaInbox>Inbox</NavLink></li> */}

                            </div>

                        }

                        <div className="divider"></div>
                        <li className='md:text-md text-xs'><NavLink to='/'><FaHome className='text-fuchsia-800 text-lg'/> Home</NavLink></li>
                        <li className='md:text-md text-xs'><NavLink to='/'><FaEnvelope className='text-emerald-800 text-lg'/> Contact</NavLink></li>
                        <li className='md:text-md text-xs'><NavLink to='/' onClick={handleLogOut}><FaArrowAltCircleRight className='text-pink-800 text-lg'/> Logout</NavLink></li>
                        <div className='flex md:gap-12 gap-4  rounded-3xl ms-4  text-sm hover:text-red-400  '>
                            <FaSun className='md:text-2xl text-yellow-500 text-md' onClick={handleThemeLight} type="checkbox" />
                            <FaMoon className='md:text-2xl text-black text-md' onClick={handleThemeDark} type="checkbox" />
                        </div>
                    </div>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;