import React from "react";
import useSelect from "../../../../Hooks/useSelect";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const SelectedClass = () => {
  const [selectClass, refetch, error] = useSelect();

  if (error) {
    return <div>Error: {error.message}</div>; // Display an error message if there is an error
  }

  console.log(selectClass);
  const handleDelete = (id) => {
    console.log(id);
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
        fetch(`https://champions-development-academy-server.vercel.app/select/classes/${id}`, {
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
    <div className="md:w-full w-[80%] overflow-x-auto md:overflow-x-hidden">
      <Helmet>
        <title>Selected Classes | Champion's Development academy</title>
      </Helmet>
      <div>
        <h1 className="md:text-4xl dark:text-white text-xl text-center mb-5 mt-5 font-bold uppercase">selected Classes </h1>
      </div>
      <div className="md:w-full w-[90%] dark:bg-black dark:text-white">
        <table className="table light:table-zebra dark:bg-black dark:text-white table-xs md:table-lg">
          {/* head */}
          <thead className="mb-8 bg-lime-100 dark:bg-slate-600 dark:text-white rounded-t-2xl">
            <tr className='uppercase md:text-md text-xs'>
              <th>#</th>
              <th>Class Photo</th>
              <th>Class Name & price</th>
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody className="dark:bg-black dark:text-white bg-red-100 rounded-2xl ">
            {Array.isArray(selectClass) && // Add a check to ensure selectClass is an array
              selectClass.map((selectedClass, index) => (
                <tr key={selectedClass._id} className="light:hover">
                  <th>{index + 1}</th>
                  <div className="md:w-32 w-24 rounded">
                    <img src={selectedClass.classImage} />
                  </div>
                  <td className="md:text-md text-sm">
                    {selectedClass.className}
                    <br />
                    <span className="text-right">Price: $ {selectedClass.price}</span>
                  </td>
                  <td>
                    {/* <Button variant="outlined">Delete</Button> */}
                    <button onClick={() => handleDelete(selectedClass._id)} className="btn bg-red-600 md:btn-md btn-sm md:text-3xl text-xl text-white"><FaTrashAlt></FaTrashAlt></button>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/payment?classId=${selectedClass._id
                        }&classData=${JSON.stringify(selectedClass)}`}
                    >
                      <button className="btn btn-warning md:btn-md btn-sm">PAY NOW</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClass;