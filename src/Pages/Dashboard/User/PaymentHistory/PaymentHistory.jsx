import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import DataTable, { createTheme } from 'react-data-table-component';


const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth()
  const { data: paymentHistoryData = [], refetch } = useQuery(
    ["AllClassesBYAdmin"],
    {
      queryFn: async () => {
        const res = await axiosSecure.get(`/payments/${user.email}`);
        return res.data;
      },
    }
  );
  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '8%',
    },
    {
      name: 'TRANSACTION ID',
      width: '35%',
      cell: (row) => (
        <td>{row.transaction_id}</td>
      )
    },
    {
      name: 'PAID AMOUNT',
      width:'15%',
      sortable: true,
      cell: (row) => (
        <td >$ {row.pay / 100}</td>
      )
    },
    {
      name: 'STATUS',
      width:'15%',
      cell: (row) => (
        <td className="text-green-600 font-bold">{row.status}</td>
      )
    },
    {
      name: 'DATE & TIME',
      cell: (row) => (
        <td>{row.Date}</td>
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
    pagination: {
      style: {
        backgroundColor: 'gray',
        color: 'blue',
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
        border:'2px solid red'
      },
      pageSizeOptionsStyle: {
        backgroundColor: 'red', // Set the background color to red
        color: 'white',
        border:'4px solid red'
      },
    },
  }
  createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b39',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: 'black',
    },
    
  }, 'dark');
  return (
    <div className=" overflow-x-auto md:overflow-x-hidden ">
      <Helmet>
        <title>Payment History | Champion's Development academy</title>
      </Helmet>
      <h1 className="animate__rubberBand animate__animated bg-red-700 px-4 py-2 md:text-xl dark:text-white text-lg font-semibold mb-5 mt-5 uppercase"><span className="border-cyan-400 border-4 me-4" />payment history</h1>
      <div className="overflow-auto md:w-full w-[65%]">
        <DataTable
          columns={columns}
          data={paymentHistoryData}
          customStyles={customStyles}
          theme="solarized"
          pagination
          paginationPosition="left"
          highlightOnHover
        />
      </div>
    </div>

  );
};

export default PaymentHistory;