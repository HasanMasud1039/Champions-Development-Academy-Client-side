import React from 'react';
import { useState } from 'react';

const Pagination = ({items}) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const options = [5, 10, 20];
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];
    console.log(pageNumbers);
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
      }
    
    return (
        <div className="pagination text-center space-x-2 my-8 md:flex justify-between">
        {/* <p>current page: {currentPage}</p> */}

        <div className='flex '>
          <p className='mt-4'>Rows Per Page</p>
          <select className='w-20 ms-4' value={itemsPerPage} onChange={handleSelectChange}>
            {
              options.map(option => (
                <option key={option}
                  value={option}
                >
                  {option}
                </option>
              ))
            }

          </select>
        </div>
        <div className='space-x-2'>
          {
            pageNumbers.map(number =>
              <button
                key={number}
                className={currentPage === number ? 'bg-orange-600' : ''}
                onClick={() => setCurrentPage(number)}>{number+1}</button>
            )
          }
        </div>
      </div>
    );
};

export default Pagination;