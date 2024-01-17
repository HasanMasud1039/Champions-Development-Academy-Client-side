import React from 'react';
import SectionTitle from '../../../../Components/SectionTitle';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useSpring } from '@react-spring/web';

const Sponsor = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: sponsors = [] } = useQuery(
        ["sponsors"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get(`/sponsors`);
                return res.data;
            },
        }
    );
    const springs = useSpring({
        from: { x: 300 },
        to: { x: 50 },
    });
    // console.log(sponsors);
    return (
        <div className='md:px-4'>
            <SectionTitle subheading="Lets Introduce" heading="Our Sponsors"></SectionTitle>
            <div className='grid md:grid-cols-6 grid-cols-3 mt-6 gap-2 pb-9'>
                {
                    sponsors.map(sponsor => (
                        <div data-aos="flip-right" data-aos-duration="2000"  className="card glass text-center text-transparent hover:text-red-600 md:h-[300px] py-2">
                            <figure className=''><img className='md:h-[200px]  md:w-[200px] hover:shadow-xl h-[100px] w-[100px] rounded-full object-cover ' src={sponsor.photoURL} alt="car!" /></figure>
                            <div className="absolute ps-2 hover bottom-1 text-center">
                                <h2 className=" md:text-lg md:text-center text-sm mx-auto font-bold ">{sponsor.companyName}</h2>
                                <p className='md:text-md text-xs'>With us since {sponsor.yearSince}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default Sponsor;