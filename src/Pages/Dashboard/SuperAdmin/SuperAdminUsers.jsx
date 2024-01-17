import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaChalkboardTeacher, FaEnvelope, FaShieldAlt, FaTrash, FaUserAlt } from 'react-icons/fa';
import DataTable, { createTheme } from 'react-data-table-component';
import 'animate.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const SuperAdminUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/allUsers");
        setFilter(res.data);
        return res.data;
    });

    useEffect(() => {
        const result = users.filter((item) => {
            return item.name.toLowerCase().match(search.toLocaleLowerCase());
        })
        setFilter(result);
    }, [search])
    const handleRemoveUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://champions-development-academy-server.vercel.app/users/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    };
    const handleMakeInstructor = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Instructor!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://champions-development-academy-server.vercel.app/users/instructors/${id}`,
                    {
                        method: "PATCH",
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Added as an Instructor',
                                'Successful'
                            )
                        }
                    })
            }
        })
    }
    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Admin!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://champions-development-academy-server.vercel.app/users/admin/${id}`,
                    {
                        method: "PATCH",
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Added as an Admin',
                                'Successful'
                            )
                        }
                    })
            }
        })
    }
    const handleMakeUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make User!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(
                    `https://champions-development-academy-server.vercel.app/users/${id}`,
                    {
                        method: "PATCH",
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Added as an Ordinary User',
                                'Successful'
                            )
                        }
                    })
            }
        })
    }
    const columns = [
        {
            key: (row) => { row._id },
            name: <p className='text-sm md:mx-auto mx-0'>#</p>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: '8%',
        },
        {
            key: (row) => { row._id },
            name: <p className='text-xs text-center md:mx-auto mx-0'>PHOTO</p>,
            width: '15%',
            cell: (row) => (
                <div className="md:flex mx-auto items-center space-x-3">
                    <img src={row.imageURL || row.photo} className='h-16 w-16 border shadow-lg rounded' alt="" />
                </div>
            )
        },
        {
            key: (row) => { row._id },
            name: <p className='text-xs text-center md:mx-auto mx-0'>USER</p>,
            cell: (row) => (
                <div className="flex flex-col mx-auto items-center space-y-1">
                    <div className="font-bold text-sm text-center md:pt-0 pt-2">{row.name}</div>
                    <div className={`uppercase text-xs text-center font-semibold ${row.role === 'admin' ? 'text-red-500' : row.role === 'instructor' ? 'text-green-500' : 'text-orange-500'} md:pt-0 pt-2`}>
                        {row.role || 'user'}
                    </div>

                </div>
            )
        },
        {
            key: (row) => { row._id },
            name: <p className='text-xs text-center md:mx-auto mx-0'>INFO</p>,
            cell: (row) => (
                <div className='text-sm space-y-1'>
                    <span className='flex items-center gap-1'>
                        {row.email}
                    </span>
                </div>
            )
        },
        {
            key: (row) => { row._id },
            name: <p className='text-xs text-center md:mx-auto mx-0 uppercase'>actions</p>,
            cell: (row) => (
                <div className='flex justify-between mx-auto text-3xl md:text-4xl border'>
                    <div
                        onClick={() => handleRemoveUser(row._id)}
                        className=" mx-auto text-center hover:bg-orange-300 "
                    >
                        <FaTrash className='text-red-600 p-2 border-r' />
                        {/* <p>Remove</p> */}
                    </div>
                    <div
                        onClick={() => handleMakeInstructor(row._id)}
                        className={` mx-auto text-center hover:bg-emerald-300 ${row.role == 'instructor' ? 'hidden' : ''}`}
                    >
                        <FaChalkboardTeacher className='text-lime-500 p-2 border-r' />
                    </div>
                    <div
                        onClick={() => handleMakeAdmin(row._id)}
                        className={` mx-auto text-center hover:bg-cyan-300 ${row.role == 'admin' ? 'hidden' : ''}`}
                    >
                        <FaShieldAlt className='text-violet-600 p-2 border-r' />
                    </div>
                    <div
                        onClick={() => handleMakeUser(row._id)}
                        className={`mx-auto text-center hover:bg-red-300 ${!row.role || row.role !== 'instructor' && row.role !== 'admin' ? 'hidden' : ''}`}
                    >
                        <FaUserAlt className='text-fuchsia-600 p-2' />
                    </div>

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
                padding: '10px'
            },
        },
        headCells: {
            style: {
                padding: '14px',
                backgroundColor: 'white',
                // fontSize: '20px',
                fontWeight: 'bold'
            },
        },
        cells: {
            style: {
                padding: '5px',
                // fontSize: '18px'
            },
        },
        columns: {
            style: {

            }
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
    return (
        <div>
            <Helmet>
                <title>Super-Admin Users | Champion's Development academy</title>
            </Helmet>
            <div>
                <h1 className="animate__animated animate__rubberBand bg-red-700 md:px-4 px-2 py-2 md:text-xl dark:text-white text-lg font-bold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />users</h1>
                <div className='flex w-[55%] md:w-full flex-wrap md:justify-between justify-evenly md:px-4 px-2 py-2 bg-red-200 text-black my-4'>
                    <span className='flex items-center'><FaTrash className='text-red-600 text-xl' /> : Remove</span>
                    <span className='flex items-center'><FaChalkboardTeacher className='text-lime-600 text-xl' /> : Make Instructor</span>
                    <span className='flex items-center'><FaShieldAlt className='text-violet-600 text-xl' /> : Make Admin</span>
                    <span className='flex items-center'><FaUserAlt className='text-fuchsia-600 text-xl' /> : Make User</span>


                </div>
                <div className='overflow-auto md:w-full w-[65%]'>
                    <DataTable
                        columns={columns}
                        data={filter}
                        customStyles={customStyles}
                        theme="solarized"
                        pagination
                        highlightOnHover
                        subHeader
                        subHeaderAlign='left'
                        subHeaderComponent={
                            <input
                                type='text'
                                className='form-control h-8 md:w-[25%] w-[35%]'
                                placeholder='Search...'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        }
                    />
                </div>
                <Toaster></Toaster>
            </div>
        </div>
    );
};

export default SuperAdminUsers;