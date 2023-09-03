import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";


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
  console.log(paymentHistoryData);
  return (
    <div className="md:w-full w-[50%] overflow-x-auto md:overflow-x-hidden ">
      <Helmet>
        <title>Payment History | Champion's Development academy</title>
      </Helmet>
      <div>
        <h1 className="md:text-4xl text-lg md:text-center dark:text-white md:font-bold font-semibold mb-5 mt-5 uppercase"> payment history</h1>
      </div>
      <div className="md:w-full w-[99%]">
        <table className="table  dark:bg-black dark:text-white light:table-zebra table-xs md:table-md">
          {/* head */}
          <thead className="mb-8 bg-lime-100 dark:bg-slate-600  dark:text-white rounded-t-2xl">
            <tr className='uppercase md:text-md text-xs py-2'>
              <th>#</th>
              <th>transaction_id</th>
              <th>Payed Amount</th>
              <th>currency</th>
              <th>status</th>
              <th>Payer email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="  bg-red-100 dark:bg-black dark:text-white rounded-2xl ">
            {paymentHistoryData.map((payHis, index) => (
              <tr key={payHis._id}>
                <th>{index + 1}</th>
                <td>{payHis.transaction_id}</td>
                <td className="text-right">$ {payHis.pay / 100}</td>
                <td>{payHis.currency}</td>
                <td className="text-green-600 font-bold">{payHis.status}</td>
                <td>{payHis.email}</td>
                <td>{payHis.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default PaymentHistory;