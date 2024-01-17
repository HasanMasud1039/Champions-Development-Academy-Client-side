import React from 'react';
import BannerAbout from './Sections/BannerAbout';
import Choice from './Sections/Features_About';
import Team from './Sections/Team';
import Alumni from './Sections/Alumni';
import Testimonial from './Sections/Testimonial';
import Features_About from './Sections/Features_About';
import Map from './Sections/Map';

const About = () => {
    return (
        <div>
            <BannerAbout/>
            <Features_About/>
            <Team/>
            <Map/>
            <Alumni/>
            <Testimonial/>
        </div>
    );
};

export default About;