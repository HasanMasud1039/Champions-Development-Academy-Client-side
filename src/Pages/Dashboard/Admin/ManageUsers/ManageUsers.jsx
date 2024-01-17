import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { FaChalkboardTeacher, FaEnvelope, FaHome, FaPhoneAlt, FaUserShield } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import DataTable, { createTheme } from 'react-data-table-component';
import 'animate.css';

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    setFilter(res.data);
    return res.data;
  });

  useEffect(() => {
    const result = users.filter((item) => {
        return item.name.toLowerCase().match(search.toLocaleLowerCase());
    })
    setFilter(result);
}, [search])

  const handlerMakeInstructor = (id) => {
    // console.log(id);

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
  // console.log(users);
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
        // console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("New Admin added successfully");
        }
      });
  };


  const columns = [
    {
      name: <p className='text-sm md:mx-auto mx-0'>#</p>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '6%',
    },
    {
      name: <p className='text-xs text-center md:mx-auto mx-0'>USER</p>,
      sortable: true,
      cell: (row) => (
        <div className="md:flex mx-auto items-center space-x-3">
          <div
            className={`avatar ${row.role === "admin" ? "online" : "offline"
              }`}
          >
            <div
              className={`w-16 rounded-full ${row.role === "admin"
                ? "ring ring-success ring-offset-base-100 ring-offset-2"
                : "ring ring-primary ring-offset-base-100 ring-offset-2"
                } `}
            >
              <img
                src={row?.photo}
                alt="USER"
              />
            </div>
          </div>
          <div>
            <div className="font-bold text-sm text-center md:pt-0 pt-2">{row.name}</div>
            <div className="text-sm opacity-50">
              {/* {row.gender ? row.gender : "look up photo"} */}
            </div>
          </div>
        </div>
      )

    },
    {
      name: <p className='text-xs text-center md:mx-auto mx-0'>INFO</p>,
      cell: (row) => (
        <div className='text-sm space-y-1'>
          <span className='flex items-center gap-1'>
            <FaEnvelope className='text-red-500'/>
            {row.email}
          </span>
          <span className="flex items-center md:text-sm text-xs gap-1 my-1">
            <span className='text-purple-500'><FaHome></FaHome></span>
            {row.address ? row.address : "No address provided"}
          </span>
          <span className="text-sm flex items-center gap-1"> <span className='text-green-500'><FaPhoneAlt /></span>
            {row.contact
              ? row.contact
              : "No Contact No."}
          </span>
        </div>
      )

    },
    {
      name: <p className='text-xs text-center md:mx-auto mx-0'>MAKE INSTRUCTOR</p>,
      width: '15%',
      cell: (row) => (
        <button
          onClick={() => handlerMakeInstructor(row._id)}
          className="btn btn-outline btn-secondary p-2 text-2xl md:text-5xl mx-auto text-center"
          disabled={row.role === "instructor"}
        >
          <FaChalkboardTeacher></FaChalkboardTeacher>
        </button>
      )
    },
    {
      cell: (row) => (
        <div className='space-x-8 flex'>
          <div>
            <button
              onClick={() => handlerAdminMake(row._id)}
              className="btn btn-outline btn-success p-2  text-center text-2xl mx-auto md:text-5xl"
              disabled={row.role === "admin"}
            >
              <FaUserShield></FaUserShield>
            </button>
          </div>
        </div>
      ),
      name: <p className='text-xs text-center md:mx-auto mx-0'>MAKE ADMIN</p>,
      width: '12%'

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
    <div className=" overflow-x-auto md:overflow-x-hidden">
      <Helmet>
        <title>Manage Users | Champion's Development academy</title>
      </Helmet>
      <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-bold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />users</h1>
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
                className='form-control  h-8 md:w-[25%] w-[35%]'
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

export default ManageUsers;