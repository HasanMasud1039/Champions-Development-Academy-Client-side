import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SuperAdminClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const { data: classes = [], refetch } = useQuery(
        ["AllClassesBYAdmin"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get("/allClasses");
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
    const handleRemove = (id) => {
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
                fetch(`https://champions-development-academy-server.vercel.app/allClasses/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Class has been deleted.',
                                'Successful!'
                            )
                        }
                    })
            }
        })
    }
    const columns = [
        {
            name: <p className="text-xs">#</p>,
            selector: (row, index) => index + 1,
            width: '8%',
        },
        {
            name: <p className="text-xs">PHOTO & CLASS</p>,
            width: '20%',
            cell: (row) => (
                <div className=" ">
                    <img className="" src={row.classImage} alt="Class" />
                    <p className="text-white text-sm mt-1">{row.className}</p>
                </div>
            )
        },
        {
            name: <p className="text-xs">STATUS</p>,
            width: '15%',
            cell: (row) => (
                <div className='mx-auto'>
                    {/* <p className="text-white text-sm">{row.className}</p> */}
                    {row.Status === "approved" ?
                        <div className="mt-2 md:text-md text-sm">
                            <span className="label-text dark:text-white text-md mt-2">Approved</span>
                            <input type="checkbox" className="toggle ms-2 toggle-sm bg-green-700" checked />
                        </div>
                        : row.Status === "denied" ?
                            <div className=" mt-2 md:text-md text-sm">
                                <span className="label-text dark:text-white text-md mt-2 pe-2">Denied</span>
                                <input type="checkbox" className="toggle ms-2 toggle-sm bg-red-700" checked />
                            </div>
                            : <div className=" mt-2">
                                <span className="label-text dark:text-white  mt-2 pe-2">Pending</span>
                                <input type="checkbox" className="toggle ms-2 toggle-sm bg-yellow-500" checked />
                            </div>
                    }
                </div>
            )
        },
        {
            name: <p className="text-xs">INSTRUCTOR</p>,
            // width: '25%',
            cell: (row) => (
                <span className="space-y-2">
                    <img src={row.instructorPhoto} className='w-12 h-12 mx-auto' alt="" />
                    <p className="font-semibold text-white text-center">{row.instructorName}</p>
                    <p className="text-sm text-white">{row.instructorEmail}</p>
                </span>
            )
        },
        {
            name: <p className="text-xs">SEATS</p>,
            width: '15%',
            cell: (row) => (
                <div className="flex flex-col justify-center items-center">
                    <div className="shadow ">
                        <div className="md:p-3 p-1 flex flex-col justify-center items-center">
                            <div className="text-center text-sm">Available</div>
                            <div className="text-lg font-bold text-lime-400">
                                {row.availableSeats
                                    ? row.availableSeats
                                    : 0}
                            </div>
                            <div className="text-center text-sm">Enrolled</div>
                            <div className="text-lg font-bold text-red-400">
                                {row.enrolledStudents
                                    ? row.enrolledStudents
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
            name: <p className="text-xs">PRICE</p>,
            // sortable: true,
            width: '12%',
            cell: (row) => (
                <p>{row.price} $</p>
            )
        },
        {
            name: <p className="text-xs">ACTION</p>,
            width: '10%',
            cell: (row) => (
                <p onClick={() => handleRemove(row._id)} className='mx-auto text-2xl text-red-600'>
                    <FaTrashAlt />
                </p>
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
                color: 'blue',
                display:'flex',
                justifyContent: 'flex-start',
            },
            pageButtonsStyle: {
                backgroundColor: 'black',
                color: 'white',
            },
            pageButtonsActiveStyle: {
                backgroundColor: 'lightblue',
                color: 'darkblue',
            },
            pageButtonsDisabledStyle: {
                backgroundColor: 'lightgray',
                color: 'gray',
            },
            pageButtonsHoverStyle: {
                backgroundColor: 'gray',
                color: 'darkblue',
            },
            currentPageStyle: {
                backgroundColor: 'red',
                color: 'darkblue',
                border: '2px solid red',
            },
            paginationPageSizeOptions: {
                style: {
                    width: '100px', // Set the width of the select field
                },
            },
            pageSizeOptionsStyle: {
                backgroundColor: 'red', // Set the background color to red
                color: 'white',
                border: '4px solid red',
                width: '100px'
            },
        },
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
        <div>
            <Helmet>
                <title>Super-Admin Classes | Champion's Development academy</title>
            </Helmet>
            <div>
                <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-bold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />classes</h1>
                <div className='overflow-auto md:w-full w-[70%]'>
                    <DataTable
                        columns={columns}
                        data={filter}
                        customStyles={customStyles}
                        theme="solarized"
                        pagination
                        paginationPosition="left"
                        paginationComponentOptions={paginationComponentOptions}
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

export default SuperAdminClasses;