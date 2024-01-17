import { IoMdMail } from "react-icons/io";
import { FaArrowLeft, FaArrowRight, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import 'animate.css';

const Team = () => {
    const members = [
        {
            id: 1,
            name: 'Hardy Hasan',
            designation: 'Managing Director',
            photoURL: 'https://i.ibb.co/X2sBfyx/md1.png'
        },
        {
            id: 2,
            name: 'Mishkat Noor',
            designation: 'Chief Executive Officer',
            photoURL: 'https://i.ibb.co/KVF6mgh/p1.jpg'
        },
        {
            id: 3,
            name: 'Sheikh Habib',
            designation: 'Chief Admin Officer',
            photoURL: 'https://static.vecteezy.com/system/resources/previews/007/468/489/non_2x/colorful-simple-flat-of-business-man-icon-or-symbol-people-concept-illustration-vector.jpg'
        },
        {
            id: 4,
            name: 'Fardin Chisty',
            designation: 'Chief Security Officer',
            photoURL: 'https://p.turbosquid.com/ts-thumb/JY/PIO8yg/dX/policesf01_01/png/1667512862/300x300/sharp_fit_q85/101ca3fa602f1a44ed6d6c467da45b2dcc3b2f65/policesf01_01.jpg'
        },
        {
            id: 1,
            name: 'Farhan Efty',
            designation: 'Chief Accounts Officer',
            photoURL: 'https://as1.ftcdn.net/v2/jpg/01/20/34/88/1000_F_120348835_WDmo0aBSqrhA9EYwVEJXBn1VtjPcQOXn.jpg'
        },
        {
            id: 1,
            name: 'Zozo Thin',
            designation: 'Technical Head',
            photoURL: 'https://www.animaker.com/static_2.0/img/animakervoice/Portuguese.webp'
        },
        {
            id: 1,
            name: 'Shafayet Tahsin',
            designation: 'Chief Physician',
            photoURL: 'https://animaxproduction.com/wp-content/uploads/2023/11/My-Face-Cartoon-Coat-Shadow-768x984.png'
        },
    ]
    const carousel = document.querySelector('.carousel');

    let currentIndex = 0;
// console.log(carousel.children.length);
    const prevBtnClick = () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carousel.children.length - 1;
        }
        updateCarousel();
    };

    const nextBtnClick = () => {
        if (currentIndex < carousel.children.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    };
    function updateCarousel() {
        const itemWidth = carousel.children[0].offsetWidth;
        carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }
    return (
        <div className="py-4">
            <SectionTitle heading={'Who Cares the Champions'} subheading={'Our Team'}></SectionTitle>
            <div className="carousel relative rounded-box md:py-4 py-2 gap-4 w-full">
                {
                    members.map(member => (

                        <div className="carousel-item flex flex-col justify-between md:w-[250px] w-[130px] bg-white dark:bg-slate-800 bg-gradient-to-b from-sky-800 dark:from-sky-700 rounded-t-3xl dark:text-white text-center space-y-2 pb-4">
                            <img className='h-[120px] w-[120px] md:h-[240px] md:w-[240px] border-2 rounded-full animate__animated animate__zoomIn' src={member.photoURL} alt="Officer" />
                            <p className="md:text-lg text-sm font-semibold">{member.name}</p>
                            <p className="md:text-md text-xs text-red-300 md:font-semibold">{member.designation}</p>
                            <div className="mx-auto">
                            <div className="p-1 flex items-center mx-auto md:gap-4 gap-1 md:text-2xl text-lg">
                                <Link to={`mailto: champion@gmail.com`}><IoMdMail className="text-red-700" /></Link>
                                <a href=" tel: 000000000"><FaWhatsapp className="text-green-500" /></a>
                                <Link to={`https://www.facebook.com`}><FaFacebookF className="text-blue-600" /></Link>
                                <Link to={`https://www.linkedin.com`}><FaLinkedinIn className="text-violet-700" /></Link>
                            </div>
                            </div>
                        </div>
                    ))
                }
                {/* <button class="prev-btn absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-l-md fixed" onClick={prevBtnClick}>
                    <FaArrowLeft />
                </button>
                <button class="next-btn absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-r-md fixed" onClick={nextBtnClick}>
                    <FaArrowRight />
                </button> */}
            </div>
        </div>
    );
};

export default Team;