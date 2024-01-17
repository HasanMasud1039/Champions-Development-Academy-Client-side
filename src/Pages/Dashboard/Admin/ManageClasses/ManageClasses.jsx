import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import DataTable, { createTheme } from 'react-data-table-component';
import { Toaster, toast } from "react-hot-toast";
import { FaXbox } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import 'animate.css';

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const { data: classes = [], refetch } = useQuery(
        ["AllClassesBYAdmin"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get("/classes/all/manage/classes");
                setFilter(res.data);
                return res.data;
            },
        }
    );

    useEffect(() => {
        const result = classes.filter((item) => {
            return item.className.toLowerCase().match(search.toLocaleLowerCase());
        })
        setFilter(result);
    }, [search])
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
                    icon: 'success',
                    title: 'Feedback Sent Successfully.',
                    showConfirmButton: false,
                    timer: 2500,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            })
            .catch((error) => {
                console.log("Error while sending feedback:", error);
                toast.error(error);
            });

        // navigate('/dashboard/manageClasses')
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

    const columns = [
        {
            name: <p className="text-xs">#</p>,
            selector: (row, index) => index + 1,
            // sortable: true,
            width: '6%',
        },
        {
            name: <p className="text-xs">PHOTO</p>,
            sortable: true,
            // width: '17%',
            cell: (row) => (

                <div className=" ">
                    <img className="" src={row.classImage} alt="Class" />
                    {row.Status === "approved" ?
                        <div className="md:flex mt-2 md:text-md text-sm">
                            <span className="label-text dark:text-white text-md mt-2">Approved</span>
                            <input type="checkbox" className="toggle ms-2 toggle-sm bg-green-700" checked />
                        </div>
                        : row.Status === "denied" ?
                            <div className="md:flex mt-2 md:text-md text-sm">
                                <span className="label-text dark:text-white text-md mt-2 pe-2">Denied</span>
                                <input type="checkbox" className="toggle ms-2 toggle-sm bg-red-700" checked />
                            </div>
                            : <div className="md:flex mt-2">
                                <span className="label-text dark:text-white  mt-2 pe-2">Pending</span>
                                <input type="checkbox" className="toggle ms-2 toggle-sm bg-yellow-500" checked />
                            </div>
                    }
                </div>
            )
        },
        {
            name: <p className="text-xs">NAME</p>,
            // width: '18%',
            cell: (row) => (
                <p className="text-white text-sm">{row.className}</p>
            )
        },
        {
            name: <p className="text-xs">INSTRUCTOR</p>,
            // width: '25%',
            cell: (row) => (
                <span className="space-y-2">
                    <p className="font-bold text-white">{row.instructorName}</p>
                    <p className="flex text-sm gap-2"><AiOutlinePhone className="text-orange-500"/> {row.instructorPhoneNumber}</p>
                    <p className="flex text-sm gap-2">
                        <AiOutlineMail className="text-green-500"/>
                        {row.instructorEmail}
                    </p>
                </span>
            )
        },
        {
            name: <p className="text-xs">AVAILABLE SEATS</p>,
            // width: '20%',
            cell: (row) => (
                <div className="flex flex-col justify-center items-center">
                    <div className="stats shadow ">
                        <div className="md:p-3 p-1 flex flex-col justify-center items-center">
                            <div className="text-center text-sm md:block hidden">Available seats</div>
                            <div className="md:text-2xl text-lg font-bold">
                                {row.availableSeats
                                    ? row.availableSeats
                                    : 0}
                            </div>
                            <div className="stat-desc text-sm">
                                Price: ${row.price}
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: <p className="text-xs">STATUS</p>,
            // width: '15%',
            cell: (row) => (
                <div className="flex flex-col justify-end  gap-2 mr-0">
                    <button className=" btn-success  btn-sm"
                        onClick={() => handleApproved(row._id)}
                        disabled={
                            row.Status === "approved" ||
                            row.Status === "denied"
                        }
                    >
                        Approve

                    </button>
                    <button className="btn-error btn-sm"
                        onClick={() => handleDenyed(row._id)}

                        disabled={row.Status === "denied"}
                    >
                        Deny
                    </button>
                    <>
                        <label htmlFor={row._id} className="btn mx-auto text-xs md:text-md my-4 btn-sm btn-outline bg-fuchsia-600 text-white ">feedback</label>
                        <input type="checkbox" id={row._id} className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box h-[70%]">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="md:text-lg text-sm">
                                                Send feedback to instructor: <span className="md:text-lg text-sm md:font-bold font-semibold">
                                                    {row.instructorName}
                                                </span>
                                            </p>
                                            <p className="md:text-lg text-sm">
                                                Send feedback for the Class: <span className="text-lg md:font-bold font-semibold">
                                                    {row?.className}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="modal-action">
                                            <label htmlFor={row._id} className="text-2xl border-2 text-red-600">X</label>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSendFeedback} className="mb-0 mt-2">
                                        <div className="form-control">
                                            <input type="text" required placeholder="Feedback" id='feedback' className="input input-bordered w-full h-[150px]" />
                                        </div>
                                        <div className="form-control ">
                                            <input type="text" hidden readOnly id='id' value={row._id} className="input input-bordered " ></input>
                                        </div>
                                        <div className="form-control ">
                                            <input type="text" hidden readOnly id='insEmail' value={row.instructorEmail} className="input input-bordered " ></input>
                                        </div>
                                        <div className="form-control ">
                                            <input type="text" hidden readOnly id='className' value={row.className} className="input input-bordered " ></input>
                                        </div>
                                        <div className="form-control">
                                            <button className="btn bg-gradient-to-t from-blue-800 to-rose-500 text-white btn-sm text-sm md:w-[30%]  w-[60%] mx-auto">Send Feedback</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </>
                </div>
            )
        },
    ];
    const customStyles = {
        table: {
            style: {
                overflow: true,
            },
        },
        rows: {
            style: {
                minHeight: '80px',
                fontSize: '16px',
                padding: '5px'
            },
        },
        headCells: {
            style: {

                padding: '14px',
                backgroundColor: 'white',
                fontSize: '20px',
                fontWeight: 'bold'
            },
        },
        cells: {
            style: {
                padding: '5px',
                fontSize: '18px'
            },
        },
        pagination: {
            style: {
                backgroundColor: 'gray',
                color: 'white',
            },
        }
    };
    createTheme('solarized', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');
    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page:', // Text displayed before the rows per page select field
        rangeSeparatorText: 'of', // Text displayed between the page range
        selectAllRowsItem: true, // Display an option to select all rows
        selectAllRowsItemText: 'All', // Text displayed for the "Select All" option
        noRowsPerPage: false, // Do not display the rows per page options if there is only one page
      };
    return (
        <div className=" overflow-x-auto">
            <Helmet>
                <title>Manage Classes | Champion's Development academy</title>
            </Helmet>
            <Toaster></Toaster>
                <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-bold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4"/>Classes</h1>
            <div className="overflow-hidden md:w-full w-screen">
                <DataTable 
                columns={columns} 
                data={filter} 
                customStyles={customStyles} 
                theme="solarized" 
                pagination 
                paginationComponentOptions={paginationComponentOptions}
                highlightOnHover
                subHeader
                subHeaderAlign='left'
                subHeaderComponent={
                    <input
                        type='text'
                        className='form-control  h-8 md:w-[25%] w-[35%]'
                        placeholder='Search...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
                 />
            </div>
        </div>
    );
};

export default ManageClasses;