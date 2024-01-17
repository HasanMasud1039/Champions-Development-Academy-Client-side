import React, { useEffect, useState } from "react";
import useSelect from "../../../../Hooks/useSelect";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import DataTable, { createTheme } from 'react-data-table-component';

const SelectedClass = () => {
  const [selectClass, refetch, error] = useSelect();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  if (error) {
    return <div>Error: {error.message}</div>; // Display an error message if there is an error
  }
  useEffect(() => {
    const result = selectClass.filter((item) => {
        return item.className.toLowerCase().match(search.toLocaleLowerCase());
    })
    setFilter(result);
}, [search])
  const handleDelete = (id) => {
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
  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '8%',
    },
    {
      name: 'IMAGE',
      width:'25%',
      cell: (row) => (
        <div className="md:w-32 w-24 rounded">
          <img src={row.classImage} />
        </div>
      )

    },
    {
      name: 'CLASS NAME & PRICE',
      // width: '40%',
      cell: (row) => (
        <div>
          <td className="md:text-md text-sm">
            <p className="font-semibold">  {row.className}</p>
            <br />
            <span className="text-right text-cyan-400">Price: $ {row.price}</span>
          </td>
        </div>
      )

    },
    {
      width:'15%',
      name: 'ACTION',
      cell: (row) => (
        <button onClick={() => handleDelete(row._id)} className="bg-red-500 md:text-2xl text-xl mx-auto text-white"><FaTrashAlt></FaTrashAlt></button>
      )
    },
    {
      cell: (row) => (
        <td>
          <Link
            to={`/dashboard/payment?classId=${row._id
              }&classData=${JSON.stringify(row)}`}
          >
            <button className="bg-yellow-500">PAY NOW</button>
          </Link>
        </td>
      ),
      name: 'PAY',
      width:'15%'
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
        padding: '10px',
        backgroundColor: 'white',
        fontSize: '14px',
        fontWeight: 'bold'
      },
    },
    cells: {
      style: {
        padding: '5px',
        fontSize: '18px'
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
        <title>Selected Classes | Champion's Development academy</title>
      </Helmet>
      <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-semibold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />selected Classes</h1>

      <div className=" dark:bg-black dark:text-white overflow-auto md:w-full w-[65%]">
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
    </div>
  );
};

export default SelectedClass;