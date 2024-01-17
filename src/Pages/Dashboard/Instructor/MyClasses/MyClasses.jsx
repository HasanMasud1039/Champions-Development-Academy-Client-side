import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import DataTable, { createTheme } from 'react-data-table-component';
import { Toaster } from 'react-hot-toast';

const MyClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const { data: classes = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ["email", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/instructor/class/${user.email}`
            );
            setFilter(res.data);
            return res.data;
        },
    });
    useEffect(() => {
        const result = classes.filter((item) => {
            return item?.className.toLowerCase().match(search.toLocaleLowerCase());
        })
        setFilter(result);
    }, [search])
    const columns = [
        {
            name: <p className='text-xs'>#</p>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: '6%',
        },
        {
            name: <p className='text-xs'>IMAGE</p>,
            sortable: true,
            cell: (row) => (
                <div className="">
                    <img src={row.classImage} alt="" />
                </div>
            )
        },
        {
            name: <p className='text-xs'>TITLE</p>,
            // width: '25%',
            cell: (row) => (
                <p className='text-sm'>{row.className}</p>
            )
        },
        {
            name: <p className='text-xs'>AVAILABLE SEATS</p>,
            // width: '15%',
            cell: (row) => (
                <p>{row.availableSeats}</p>
            )
        },
        {
            name: <p className='text-xs'>PRICE</p>,
            // width: '15%',
            cell: (row) => (
                <p>{row.price}</p>
            ),
        },
        {
            name: <p className='text-xs'>ENROLLED</p>,
            // width: '10%',
            cell: (row) => (
                <p>{row.enrolledStudents}</p>
            ),
        },
        {
            name: <p className='text-xs'>STATUS</p>,
            // width: '15%',
            cell: (row) => (
                <td>
                    {
                        row.Status == 'approved' ?
                            <button className='btn btn-success btn-sm'>{row?.Status}</button>
                            : row.Status == 'denied' ?
                                <button className='btn btn-error btn-sm'>{row?.Status}</button> :
                                <button className='btn btn-warning btn-sm'>pending</button>
                    }
                </td>
            ),
        },
        {
            name: <p className='text-xs'>ACTION</p>,
            // width: '10%',
            cell: (row) => (
                <td className='mx-auto'>
                    <button onClick={() => handleRemoveClass(row._id)} disabled={row?.Status === 'approved'} className="btn bg-red-600 md:btn-md btn-sm md:text-2xl text-xl text-white"><FaTrash /></button>
                </td>
            ),
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
                fontSize: '14px',
                padding: '8px'
            },
        },
        headCells: {
            style: {
                padding: '10px',
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
                padding: '2px 25px',
                display:'flex',
                justifyContent: 'center'
            }
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

    const handleRemoveClass = (id) => {

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
                fetch(`https://champions-development-academy-server.vercel.app/users/instructor/class/${id}`, {
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

    }
    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page:', // Text displayed before the rows per page select field
        rangeSeparatorText: 'of', // Text displayed between the page range
        selectAllRowsItem: true, // Display an option to select all rows
        selectAllRowsItemText: 'All', // Text displayed for the "Select All" option
        noRowsPerPage: true, // Do not display the rows per page options if there is only one page
      };

    return (
        <div>
            <Helmet>
                <title>My Classes | Champion's Development academy</title>
            </Helmet>
            <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-semibold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />my Classes</h1>

            <div className=" dark:bg-black dark:text-white overflow-auto md:w-full w-[65%]">
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
    );
};

export default MyClasses;