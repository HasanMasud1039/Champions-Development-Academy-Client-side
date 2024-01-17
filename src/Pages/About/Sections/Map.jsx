import React from 'react';
import mapImg from '../../../assets/about/cda_map.jpg'
import SectionTitle from '../../../Components/SectionTitle';
import 'animate.css';
const Map = () => {
    return (
        <div className='md:flex '>
            <div className='map md:w-[50%] w-full md:p-4 p-2'>
                <img className='md:h-full w-full saturate-150' src={mapImg} alt="" />
            </div>
            <div className='bg-gradient-to-t from-emerald-700 md:m-4 m-2 md:w-[50%] w-full'>
                {/* <SectionTitle heading={'We Are in Map'} subheading={'Out Location'}></SectionTitle> */}
                <div className="md:w-4/12 my-4 text-center font-bold mx-auto space-y-2 md:pt-4 pt-2">
                    <p style={{ fontFamily: 'Playfair Display' }} className=" md:text-lg text-orange-500">--- Out Location ---</p>
                    <h3 className="text-xl md:text-2xl uppercase border-y-4 py-4 text-orange-600">here we are</h3>
                </div>
                <div className='grid md:grid-cols-4 mx-2 gap-2 text-md'>
                    <div className='col-span-2 rounded-sm bg-zinc-50 p-2'>
                        <h1 className='font-bold md:text-xl text-center pt-2  border-b-2 uppercase animate__animated animate__backInLeft'>Academic</h1>
                        <ul className='grid grid-cols-2 capitalize md:text-sm text-xs space-y-1 pt-2'>
                            <li>1. office room</li>
                            <li>2. auditorium</li>
                            <li>3. cafeteria</li>
                            <li>4. activities  room</li>
                            <li>5. library</li>
                            <li>6. physicians room</li>
                            <li>7. dormitory</li>
                            <li>8. gymnasium</li>
                            <li>9. analysis  lab</li>
                            <li>10. office room</li>
                            <li>11-17. housing</li>
                        </ul>
                    </div>
                    <div className='col-span-2 rounded-sm bg-zinc-50 p-2'>
                        <h1 className='font-bold md:text-xl text-center pt-2 border-b-2 uppercase animate__animated animate__backInRight'>Athletic</h1>
                        <ul className=' grid grid-cols-2 capitalize md:text-sm text-xs space-y-1 pt-2'>
                            <li>A. Practice field</li>
                            <li>B. archery field</li>
                            <li>C. basketball field</li>
                            <li>D. batting pitches</li>
                            <li>E. practice field</li>
                            <li>F. swimming pool</li>
                            <li>G. Practice court</li>
                            <li>H.  pavilions</li>
                            <li>i. football field</li>
                            <li>j. tract & cricket field</li>
                        </ul>
                    </div>
                </div>
                <div className='px-4 py-2 m-2 rounded-xl bg-zinc-50 md:text-md text-sm'>
                    <p><span className='font-semibold'>Area</span> : 236 Acers</p>
                    <p><span className='font-semibold'>Location</span> : Plot 10-24, Karnaphuli Housing, Rangunia, Chattogram.</p>
                </div>
            </div>
        </div>
    );
};

export default Map;