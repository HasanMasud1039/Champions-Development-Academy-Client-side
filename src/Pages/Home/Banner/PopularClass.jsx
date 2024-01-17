import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import basketball from '../../../assets/basketball.jpg'
import football from '../../../assets/football.jpg'
import cricket from '../../../assets/cricket.jpg'
import archery from '../../../assets/archery.jpg'
import { Link } from 'react-router-dom';


const PopularClass = () => {
    return (
        <div>
            <SectionTitle subheading="Don't Miss" heading="Our Popular Classes"></SectionTitle>
            <div className='md:flex md:justify-around grid grid-cols-2 md:mb-8 gap-2 md:gap-8 md:px-12 p-2 md:py-4'>

                <div className="card border-4 md:border-amber-600  md:w-[80%] bg-red-500 hover:scale-125 shadow-xl image-full">
                    <figure><img className='w-[90%]' src={basketball} alt="Basketball" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Basketball!</h2>
                        <p> Do You Like It?</p>
                        <div className="card-actions justify-end">
                            <button className="btn p-2 btn-sm text-white font-bold  bg-orange-600 mt-8 btn-error"><Link to='/allClasses'>Select now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="card border-4 md:border-amber-600  md:w-[80%] bg-red-500 hover:scale-125 shadow-xl image-full">
                    <figure><img src={football} alt="Basketball" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Football!</h2>
                        <p> Do You Like It?</p>
                        <div className="card-actions justify-end">
                                                    <button className="btn p-2 btn-sm text-white font-bold  bg-orange-600 mt-8 btn-error"><Link to='/allClasses'>Select now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="card border-4 md:border-amber-600  md:w-[80%] bg-red-500 hover:scale-125 shadow-xl image-full">
                    <figure><img src={cricket} alt="Basketball" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Cricket!</h2>
                        <p> Do You Like It?</p>
                        <div className="card-actions justify-end">
                                                    <button className="btn p-2 btn-sm text-white font-bold  bg-orange-600 mt-8 btn-error"><Link to='/allClasses'>Select now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="card border-4 md:border-amber-600  md:w-[80%] bg-red-500 hover:scale-125 shadow-xl image-full">
                    <figure><img src={archery} alt="Basketball" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Archery</h2>
                        <p> Do You Like It?</p>
                        <div className="card-actions justify-end">
                                                    <button className="btn p-2 btn-sm text-white font-bold  bg-orange-600 mt-8 btn-error"><Link to='/allClasses'>Select now</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularClass;