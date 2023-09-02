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

            // console.log("this is Instructor");
            return res.data;
        },
    });

    console.log(classes);

    const handleRemoveClass= (id) => {
        // console.log("delete id: ", id);
        // axiosSecure
        // .delete(`/users/instructor/class/${id}`)
        // .then((res) => {
        //      console.log("deleted class", res.data);
        //     //TODO
        //   });/////////////

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
                fetch(`http://localhost:5000/users/instructor/class/${id}`, {
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
        <div>
            <Helmet>
                <title>My Classes | Champion's Development academy</title>
            </Helmet>
            <p className='uppercase text-4xl text-center py-4 font-bold'>my Classes</p>
            <div>
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-green-100 bg-opacity-20">
                        <tr className='uppercase'>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Available Seats</th>
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
                                            <button className='btn btn-success'>{myClass?.Status}</button>
                                            : myClass.Status == 'denied' ?
                                                <button className='btn btn-error'>{myClass?.Status}</button> :
                                                <button className='btn btn-warning'>pending</button>
                                    }
                                </td>
                                <td>

                                    <button onClick={()=>handleRemoveClass(myClass._id)} disabled={myClass?.Status === 'approved'} className='text-3xl btn btn-outline text-red-800 text-center'><FaTrash/></button>
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