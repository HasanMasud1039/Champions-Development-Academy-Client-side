import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';
import Pagination from '../../../../Components/Pagination';


const EnrolledClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const { data: successfullyPaymentClass = [], refetch } = useQuery(
    ["successfullyPaymentClass"],
    {
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments/successfully/${user.email}`);
        setFilter(res.data);
        return res.data;
      },
    }
  );
  useEffect(() => {
    const result = successfullyPaymentClass.filter((item) => {
        return item.className.toLowerCase().match(search.toLocaleLowerCase());
    })
    setFilter(result);
}, [search])
  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '6%',
    },
    {
      name: 'IMAGE',
      cell: (row) => (
        <div className="md:w-28 w-24 rounded-xl">
          <img src={row.classImage} />
        </div>
      )

    },
    {
      name: 'CLASS NAME',
      width:'25%',
      cell: (row) => (
        <div>
          <td>{row.className}</td>
        </div>
      )

    },
    {
      name: 'PRICE ($)',
      // width: '15%',
      sortable: true,
      cell: (row) => (
        <div className=''>
          <td>{row.price}</td>
        </div>
      ),
    },
    {
      name: 'STATUS',
      // width: '15%',
      cell: (row) => (
        <div className=''>
          <td className="text-green-600">{row.status}</td>
        </div>
      ),
    },
    {
      name: 'ENROLLED DATE',
      // width: '15%',
      cell: (row) => (
        <div className=''>
          <td>{row.Date}</td>
        </div>
      ),
      sortable: true,
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
    <div className=" overflow-x-auto md:overflow-x-hidden ">
      <Helmet>
        <title>Enrolled Classes | Champion's Development academy</title>
      </Helmet>
      <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-semibold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />enrolled Classes</h1>
      <div>
        <div className="overflow-auto md:w-full w-[65%]">
          <DataTable 
          columns={columns} 
          data={successfullyPaymentClass} 
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

    </div>
  );
};

export default EnrolledClass;