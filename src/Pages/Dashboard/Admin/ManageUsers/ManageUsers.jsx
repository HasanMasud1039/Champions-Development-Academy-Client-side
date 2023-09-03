import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { FaChalkboardTeacher, FaHome, FaPersonBooth, FaPhoneAlt, FaShieldAlt, FaUserShield } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import { Helmet } from 'react-helmet';

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  console.log(users);

  const handlerMakeInstructor = (id) => {
    console.log(id);

    fetch(
      `https://champions-development-academy-server.vercel.app/users/instructors/${id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // TODO: handle
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("New instructor added successfully");
        }
      });
  };

  // Make Admin handler
  const handlerAdminMake = (id) => {
    fetch(
      `https://champions-development-academy-server.vercel.app/users/admin/${id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // TODO: handle-admin
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("New Admin added successfully");
        }
      });
  };

  const springs = useSpring({
    from: { x: -100 },
    to: { x: 100 },
  });
  return (
    <div className="md:w-full w-[65%] overflow-x-auto md:overflow-x-hidden">
      <Helmet>
        <title>Manage Users | Champion's Development academy</title>
      </Helmet>
      <animated.div
        style={{
          ...springs,
        }}
      >
        <h1 className="md:text-4xl text-xl md:text-center font-bold mb-5 mt-5 uppercase">users</h1>
      </animated.div>
      <div className="md:w-full w-[90%]">
        <table className="table table-zebra table-xs md:table-md">
          {/* head */}
          <thead className="mb-8 bg-lime-100 rounded-t-2xl">
            <tr className='uppercase md:text-md text-xs'>
              <th>#</th>
              <th>User</th>
              <th>Info</th>
              <th>Make Instructor</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody className="  bg-red-100 rounded-2xl ">
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`avatar  ${user.role === "admin" ? "online" : "offline"
                        }`}
                    >
                      <div
                        className={`w-16 rounded-full ${user.role === "admin"
                          ? "ring ring-success ring-offset-base-100 ring-offset-2"
                          : "ring ring-primary ring-offset-base-100 ring-offset-2"
                          } `}
                      >
                        <img
                          src={user?.photo}
                          alt="Admin"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user.gender ? user.gender : "look up photo"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
                  <br />
                  <span className="badge badge-ghost badge-sm my-3">
                    <span className='me-2'><FaHome></FaHome></span>
                    {user.address ? user.address : "No address provided"}
                  </span>
                  <br />
                  <span className="badge badge-sm"> <span className='me-2'><FaPhoneAlt></FaPhoneAlt></span>
                    {user.contact
                      ? user.contact
                      : "No Contact No. provided"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handlerMakeInstructor(user._id)}
                    className="btn btn-outline btn-secondary p-2 text-3xl"
                    disabled={user.role === "instructor"}
                  >
                    <FaChalkboardTeacher></FaChalkboardTeacher>
                    <Toaster></Toaster>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handlerAdminMake(user._id)}
                    className="btn btn-outline btn-success p-2 text-3xl"
                    disabled={user.role === "admin"}
                  >
                    <FaUserShield></FaUserShield>
                    <Toaster></Toaster>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      );
};

      export default ManageUsers;