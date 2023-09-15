import React from 'react';
import Banner from '../Banner/Banner';
import PopularClass from '../Banner/PopularClass';
import PopularInstructors from '../Banner/PopularInstructors';
import Sponsor from '../Banner/Sponsor/Sponsor';
import PaymentCards from '../Banner/PaymentCards/PaymentCards';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Champion's Development academy</title>
            </Helmet>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructors></PopularInstructors>
            <Sponsor></Sponsor>
            <PaymentCards></PaymentCards>
        </div>
    );
};

export default Home;