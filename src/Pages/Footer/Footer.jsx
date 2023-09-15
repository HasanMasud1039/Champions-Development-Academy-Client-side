import React from 'react';

const Footer = () => {
  return (

    <footer className='px-8 pt-6 md:bg-slate-200 bg-black md:text-black text-white dark:text-white dark:bg-slate-800 text-base-content'>
      <div className="footer">
        <div className='text-center'>
          <img className='w-28 mx-auto rounded-full' src="cda2.PNG" alt="" />
          <p><span className='font-bold'>Champion's Development Academy</span><br />Providing reliable service since 1992</p>
        </div>
        <div className='text-center'>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div className='text-center'>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div className='text-center'>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </div>
      <div className='flex justify-center text-center mt-8 md:text-md text-sm'>
        <p>Copyright © 2023 - All right reserved by <span className='font-semibold md:font-bold'>Champion's Development Academy</span></p>
      </div>
    </footer>

  );
};

export default Footer;