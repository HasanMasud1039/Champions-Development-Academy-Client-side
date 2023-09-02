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
    <div>
      <Helmet>
        <title>Selected Classes | Champion's Development academy</title>
      </Helmet>
      <div>
        <h1 className="text-4xl text-center mb-5 mt-5 uppercase">selected Classes </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="mb-8">
            <tr className='uppercase'>
              <th>#</th>
              <th>Class Photo</th>
              <th>Class Name & price</th>
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(selectClass) && // Add a check to ensure selectClass is an array
              selectClass.map((selectedClass, index) => (
                <tr key={selectedClass._id} className="hover">
                  <th>{index + 1}</th>
                  <div className="w-32 rounded">
                    <img src={selectedClass.classImage} />
                  </div>
                  <td>
                    {selectedClass.className}
                    <br />
                    <span className="text-right">Price: $ {selectedClass.price}</span>
                  </td>
                  <td>
                    {/* <Button variant="outlined">Delete</Button> */}
                    <button onClick={() => handleDelete(selectedClass._id)} className="btn bg-red-600 text-3xl text-white"><FaTrashAlt></FaTrashAlt></button>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/payment?classId=${selectedClass._id
                        }&classData=${JSON.stringify(selectedClass)}`}
                    >
                      <button className="btn btn-warning ">PAY NOW</button>
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