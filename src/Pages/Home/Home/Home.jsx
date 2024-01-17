import React from 'react';
import Banner from '../Banner/Banner';
import PopularClass from '../Banner/PopularClass';
import PopularInstructors from '../Banner/PopularInstructors';
import Sponsor from '../Banner/Sponsor/Sponsor';
import PaymentCards from '../Banner/PaymentCards/PaymentCards';
import { Helmet } from 'react-helmet';
import Achievement from '../Banner/Achivement';
import AboutUs from '../Banner/AboutUs';
import Choice from '../Banner/Choice';
import Gallery from '../Banner/Gallery';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Champion's Development academy</title>
            </Helmet>
            <Banner></Banner>
            <PopularClass></PopularClass>
            <PopularInstructors></PopularInstructors>
            <Achievement></Achievement>
            <Choice/>
            <AboutUs></AboutUs>
            <Sponsor></Sponsor>
            <PaymentCards></PaymentCards>
            <Gallery/>
        </div>
    );
};

export default Home;