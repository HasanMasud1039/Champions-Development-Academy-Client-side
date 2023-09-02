import React from 'react';
import SectionTitle from '../../../../Components/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Sponsor = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: sponsors = [], refetch } = useQuery(
        ["sponsors"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get(`/sponsors`);
                return res.data;
            },
        }
    );
    // console.log(sponsors);
    return (
        <div>
            <SectionTitle subheading="Lets Introduce" heading="Our Sponsors"></SectionTitle>
            <div className='grid md:grid-cols-6 grid-cols-3 mt-6 gap-2 pb-9'>
                {
                    sponsors.map(sponsor => (
                        <div className="card glass text-transparent hover:text-black md:h-[300px] py-2">
                            <figure><img className='md:h-[200px] md:w-[200px] hover:shadow-xl h-[100px] w-[100px] rounded-full object-cover ' src={sponsor.photoURL} alt="car!" /></figure>
                            <div className="absolute ps-2  bottom-1 ">
                                <h2 className=" md:text-md text-xs mx-auto font-bold ">{sponsor.companyName}</h2>
                                <p >With us since {sponsor.yearSince}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default Sponsor;