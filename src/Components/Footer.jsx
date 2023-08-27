import React from 'react';

import { TbWorld } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";

const Footer = () => {
    return (
        <div className=''>
            <div className='mx-20 py-3 md:flex-col lg:flex-row lg:justify-between md:items-center md:text-center md:flex hidden'>
                <p>© 2023 Airbnb, Inc. · TermsSitemap · PrivacyYour · Privacy Choices · Destinations</p>
                <div className='flex items-center'>
                    <TbWorld className='text-xl mr-2'></TbWorld>
                    <p className='md:mt-1 lg:mt-0'>English (US) <span className='ml-2'>$ USD</span> <span className='ml-2'>Support & resources</span></p>
                </div>
            </div>
            <div className='flex justify-center gap-8 md:hidden'>
                <div className='flex flex-col items-center text-gray-400 py-2'>
                    <FiSearch className='text-xl'></FiSearch>
                    <p className='text-gray-400 text-[12px]'>Explore</p>
                </div>
                <div className='flex flex-col items-center text-gray-400 py-2'>
                    <MdOutlineFavoriteBorder className='text-xl'></MdOutlineFavoriteBorder>
                    <p className='text-gray-400 text-[12px]'>Explore</p>
                </div>
                <div className='flex flex-col items-center text-gray-400 py-2'>
                    <BiUserCircle className='text-xl'></BiUserCircle>
                    <p className='text-gray-400 text-[12px]'>Explore</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;