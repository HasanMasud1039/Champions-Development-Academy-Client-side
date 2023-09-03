import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../../Components/SectionTitle';
import { Link } from 'react-router-dom';

const PaymentCards = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: cards = [], refetch } = useQuery(
        ["cards"],
        {
            queryFn: async () => {
                const res = await axiosSecure.get(`/paymentCards`);
                return res.data;
            },
        }
    );
    // console.log(cards);
    return (
        <div className='md:px-4'>
            <SectionTitle subheading="We Accept" heading="Online Payments"></SectionTitle>
            <div className='grid md:grid-cols-8 grid-cols-4 mt-6 pb-9 gap-2'>
                {
                    cards.map(card => (
                        <div className="card glass md:h-[130px] p-1">
                            <figure><Link><img className='h-[100px] md:w-[200px]  rounded-xl object-contain ' src={card.cardImage} alt="car!" /></Link></figure>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default PaymentCards;