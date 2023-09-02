
import { NavLink, Outlet } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBook, FaCalendarAlt, FaClipboardList, FaCloudMoon, FaComment, FaCreditCard, FaEnvelope, FaFolderPlus, FaHamburger, FaHome, FaInbox, FaListAlt, FaMoon, FaShoppingBag, FaThList, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { logOut } = useContext(AuthContext);
    const [theme, setTheme] = useState(null);
    const feedbacks= localStorage.getItem("feedbacks");

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

    const handleThemeSwitch = () => {
        console.log("clicked")
        setTheme(theme === "dark" ? "light" : "dark");
    };


    return (
        <div className="drawer drawer-mobile lg:drawer-open w-full ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content  py-4">
                <label htmlFor="my-drawer-2"className="btn  bg-orange-600 rounded-b-3xl px-8 rounded-t-sm drawer-button lg:hidden">Dashboard</label>
                <div className='w-[90%] mx-auto'><Outlet></Outlet></div>
            </div>
            <div className="drawer-side  w-[62%] md:w-[90%]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                <ul className="menu md:p-4 p-1 md:w-80 w-60 h-full bg-gradient-to-r to-[#3F96EE]  from-blue-300">
                    <div className="uppercase text-sm md:text-lg font-serif space-y-2 md:font-bold font-semibold  w-[90%] mb-6">
                        <label htmlFor="my-drawer-2" className=" absolute right-6 top-0 bg-transparent text-3xl text-red-800 p-1  drawer-button lg:hidden"><FaArrowAltCircleLeft></FaArrowAltCircleLeft> </label>
                        <div className="flex justify-between  md:w-full w-[60%]">
                            <img className="md:w-20 w-10 rounded-full" src='/public/cda2.PNG' alt="" />
                            <p className="md:text-xl font-serif">Champions Development Academy</p>
                        </div>
                        <hr /><hr />
                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/manageClasses'><FaListAlt></FaListAlt> Manage Classes
                                </NavLink></li>
                                <li><NavLink to='/dashboard/manageUsers'><FaUsers></FaUsers>Manage Users</NavLink></li>
                                {/* <li><NavLink to='/dashboard'><FaInbox></FaInbox>Inbox</NavLink></li> */}


                            </> : isInstructor ? <>

                                <li><NavLink to='/dashboard/instructorHome'><FaHome></FaHome> Instructor Home</NavLink></li>
                                <li><NavLink to='/dashboard/addClass'><FaFolderPlus></FaFolderPlus> Add Class</NavLink></li>
                                <li><NavLink to='/dashboard/myClasses'><FaClipboardList></FaClipboardList> My Classes</NavLink></li>
                                <li><NavLink to='/dashboard/instructorInbox'><FaInbox></FaInbox>Inbox <div className="badge badge-warning px-4 text-xl">{feedbacks}</div></NavLink></li>
                            </> : <>

                                <li><NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/selectedClasses'><FaWallet></FaWallet>Selected Classes</NavLink></li>
                                <li><NavLink to='/dashboard/enrolledClasses'><FaThList></FaThList> Enrolled Classes</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'><FaCreditCard></FaCreditCard>Payment History</NavLink></li>
                                {/* <li><NavLink to='/dashboard'><FaInbox></FaInbox>Inbox</NavLink></li> */}
                                
                            </>

                        }

                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                        <li><NavLink to='/'><FaEnvelope></FaEnvelope> Contact</NavLink></li>
                        <li><span className='text-lg'><FaMoon/> Dark                             
                                <input role='switch' id='black' defaultChecked onClick={handleThemeSwitch} type="checkbox" className="toggle px-4 " /></span>
                            </li>
                        <li><NavLink to='/' onClick={handleLogOut}><FaArrowAltCircleRight></FaArrowAltCircleRight> Logout</NavLink></li>
                    </div>


                </ul>

            </div>
        </div>
    );
};

export default Dashboard;