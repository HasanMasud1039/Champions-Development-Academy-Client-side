import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

import { useSpring, animated } from "@react-spring/web";
import { Toaster, toast } from "react-hot-toast";
import { FaXbox } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const { data: adminClassesAll = [], refetch } = useQuery(
        ["AllClassesBYAdmin"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get("/classes/all/manage/classes");
                return res.data;
            },
        }
    );
    // console.log(adminClassesA ll);



    const handleSendFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedbackText = form.feedback.value;
        const selectedClassId = form.id.value;
        const selectedClassEmail = form.insEmail.value;
        const selectedClassName = form.className.value;
        console.log(feedbackText, selectedClassId, selectedClassEmail, selectedClassName);


        axiosSecure
            .patch(`/admin/feedback`, { _id: selectedClassId, feedback: feedbackText, instructorEmail: selectedClassEmail, className: selectedClassName })
            .then((data) => {
                console.log("after posting feedback", data.data);
                refetch();
                // setOpen(false);
                Swal.fire({
                    title: 'Update Profile Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                // navigate('/dashboard/manageClasses')
            })
            .catch((error) => {
                console.log("Error while sending feedback:", error);
                toast.error(error);
            });

    };

    const handleApproved = (id) => {
        fetch(`https://champions-development-academy-server.vercel.app/class/approved/${id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('class approved successfully')
                }
            })
            .catch((error) => {
                console.log("Error while approving class:", error);
                toast.error(error);
            });
    };

    const handleDenyed = (id) => {
        fetch(`https://champions-development-academy-server.vercel.app/class/denied/${id}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Class denied successfully')
                }
            })
            .catch((error) => {
                console.log("Error while denying class:", error);
                toast.error(error)
            });
    };
    const springs = useSpring({
        from: { x: -100 },
        to: { x: 100 },
    });
    return (
        <div className="md:w-full w-[55%] overflow-x-auto md:overflow-x-hidden">
            <Helmet>
                <title>Manage Classes | Champion's Development academy</title>
            </Helmet>
            <Toaster></Toaster>
            <animated.div
                style={{
                    ...springs,
                }}
            >
                <h1 className="md:text-4xl dark:text-white text-xl md:text-center font-bold mb-5 mt-5 uppercase">Classes</h1>
            </animated.div>
            <div className="dark:text-white dark:bg-black">
                <div className="md:w-full w-[90%]">
                    <table className="table light:table-zebra table-xs md:table-md">
                        {/* head */}
                        <thead className="mb-8 bg-lime-100 dark:text-white dark:bg-slate-700 rounded-t-2xl">
                            <tr className='uppercase md:text-lg text-xs flex justify-evenly'>
                                <th>#</th>
                                <th>Class Image</th>
                                <th>Class name</th>
                                <th>Instructor</th>
                                <th>Available Seats</th>
                                <th className="text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className=" bg-red-100 dark:text-white dark:bg-black">
                            {adminClassesAll.map((adminClasses, index) => (<div key={adminClasses._id}>
                                {
                                    adminClasses.className ?
                                        <div>
                                            <tr className=" space-y-4">
                                                <th>{index + 1}</th>
                                                <td className="w-[30%]">
                                                    <div className="w-28 md:w-36 rounded-xl">
                                                        <img className="rounded-t-xl" src={adminClasses.classImage} alt="Class" />
                                                        {adminClasses.Status === "approved" ?
                                                            <div className="flex mt-2 md:text-md text-sm">
                                                                <span className="label-text dark:text-white text-lg mt-2 pe-2">Approved</span>
                                                                <input type="checkbox" className="toggle md:toggle-lg toggle-sm bg-green-700" checked />
                                                            </div>
                                                            : adminClasses.Status === "denied" ?
                                                                <div className="flex mt-2 md:text-md text-sm">
                                                                    <span className="label-text dark:text-white text-lg mt-2 pe-2">Denied</span>
                                                                    <input type="checkbox" className="toggle md:toggle-lg toggle-sm bg-red-700" checked />
                                                                </div>
                                                                : <div className="flex mt-2">
                                                                    <span className="label-text dark:text-white text-lg mt-2 pe-2">Pending</span>
                                                                    <input type="checkbox" className="toggle toggle-lg bg-yellow-500" checked />
                                                                </div>

                                                        }
                                                    </div>
                                                </td>
                                                <td className="font-bold w-[30%] md:text-lg text-md text-left">{adminClasses.className}</td>
                                                <td className="w-[30%] space-y-2">
                                                    <p className="font-semibold md:font-bold md:text-lg mb-2 text-left">{adminClasses.instructorName}</p>

                                                    <span>
                                                        <p className="flex text-sm gap-2"><AiOutlinePhone></AiOutlinePhone> {adminClasses.instructorPhoneNumber}</p>
                                                        <p className="flex gap-2">
                                                            <AiOutlineMail />
                                                            {adminClasses.instructorEmail}
                                                        </p>
                                                    </span>
                                                </td>
                                                <td className="w-full">
                                                    <div className="flex flex-col justify-center items-center">
                                                        <div className="stats shadow ">
                                                            <div className="p-3 flex flex-col justify-center items-center">
                                                                <div className="text-center">Available seats</div>
                                                                <div className="md:text-2xl text-lg font-bold">
                                                                    {adminClasses.availableSeats
                                                                        ? adminClasses.availableSeats
                                                                        : 0}
                                                                </div>
                                                                <div className="stat-desc md:text-lg text-sm">
                                                                    Price: ${adminClasses.price}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className=" ">
                                                    <div className="flex flex-col justify-end  gap-2 mr-0">
                                                        <button className=" btn-success md:btn-md btn-sm"
                                                            onClick={() => handleApproved(adminClasses._id)}
                                                            disabled={
                                                                adminClasses.Status === "approved" ||
                                                                adminClasses.Status === "denied"
                                                            }
                                                        >
                                                            Approve

                                                        </button>
                                                        <button className="btn-error md:btn-md btn-sm"
                                                            onClick={() => handleDenyed(adminClasses._id)}

                                                            disabled={adminClasses.Status === "denied"}
                                                        >
                                                            Deny

                                                        </button>

                                                        <>
                                                            <label htmlFor={adminClasses._id} className="btn mx-auto my-4 btn-sm btn-outline bg-fuchsia-600 text-white ">feedback</label>

                                                            <input type="checkbox" id={adminClasses._id} className="modal-toggle" />
                                                            <div className="modal">
                                                                <div className="modal-box h-[50%]">
                                                                    <div>
                                                                        <div className="flex items-center justify-between">
                                                                            <div>
                                                                                <p className="md:text-lg text-sm">
                                                                                    Send feedback to instructor: <span className="text-lg md:font-bold font-semibold">
                                                                                        {adminClasses.instructorName}
                                                                                    </span>
                                                                                </p>
                                                                                <p className="md:text-lg text-sm">
                                                                                    Send feedback for the Class: <span className="text-lg md:font-bold font-semibold">
                                                                                        {adminClasses?.className}
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                            <div className="modal-action">
                                                                                <label htmlFor={adminClasses._id} className="text-2xl text-red-600"><FaXbox></FaXbox></label>
                                                                            </div>
                                                                        </div>
                                                                        <form onSubmit={handleSendFeedback} className="mb-0 mt-2">
                                                                            <div className="form-control">
                                                                                <input type="text" required placeholder="Feedback" id='feedback' className="input input-bordered w-full h-[150px]" />
                                                                            </div>
                                                                            <div className="form-control ">
                                                                                <input type="text" hidden readOnly id='id' value={adminClasses._id} className="input input-bordered " ></input>
                                                                            </div>
                                                                            <div className="form-control ">
                                                                                <input type="text" hidden readOnly id='insEmail' value={adminClasses.instructorEmail} className="input input-bordered " ></input>
                                                                            </div>
                                                                            <div className="form-control ">
                                                                                <input type="text" hidden readOnly id='className' value={adminClasses.className} className="input input-bordered " ></input>
                                                                            </div>
                                                                            <div className="form-control">
                                                                                <button className="btn btn-primary md:w-[30%]  w-[60%] mx-auto">Send Feedback</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </>
                                                    </div>
                                                </td>
                                            </tr>
                                        </div>
                                        : <></>
                                }
                            </div>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;