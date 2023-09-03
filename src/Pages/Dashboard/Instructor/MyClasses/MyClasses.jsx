import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: classes = [], refetch } = useQuery({
        enabled: !loading,
        queryKey: ["email", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/instructor/class/${user.email}`
            );
            return res.data;
        },
    });

    console.log(classes);

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

    return (
        <div className="md:w-full w-[55%] overflow-x-auto md:overflow-x-hidden">
            <Helmet>
                <title>My Classes | Champion's Development academy</title>
            </Helmet>
            <h1 className="md:text-4xl text-lg md:text-center md:font-bold font-semibold mb-5 mt-5 uppercase">my Classes</h1>
            <div className="md:w-full w-[90%]">
                <table className="table table-zebra table-xs md:table-lg">
                    {/* head */}
                    <thead className="mb-8 bg-lime-100 rounded-t-2xl">
                        <tr className='uppercase md:text-md text-xs'>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th> Seats</th>
                            <th>Price</th>
                            <th>Enrolled</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((myClass, index) => (
                            <tr key={myClass._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="">
                                        <img src={myClass.classImage} alt="" />
                                    </div>
                                </td>
                                <td>
                                    {myClass.className}

                                </td>
                                <td>
                                    {myClass.availableSeats}
                                </td>
                                <td>
                                    {myClass.price}
                                </td>
                                <td>
                                    {myClass.enrolledStudents}
                                </td>
                                <td>
                                    {
                                        myClass.Status == 'approved' ?
                                            <button className='btn btn-success md:btn-md btn-sm '>{myClass?.Status}</button>
                                            : myClass.Status == 'denied' ?
                                                <button className='btn btn-error md:btn-md btn-sm '>{myClass?.Status}</button> :
                                                <button className='btn btn-warning'>pending</button>
                                    }
                                </td>
                                <td>

                                    <button onClick={() => handleRemoveClass(myClass._id)} disabled={myClass?.Status === 'approved'} className="btn bg-red-600 md:btn-md btn-sm md:text-3xl text-xl text-white"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;