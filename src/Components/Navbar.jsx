import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const Navbar = () => {
    const [userMenuToggle, setUserMenuToggle] = useState(false);
    return (
        <div className='pt-4 pb-4 px-20'>
            <div className='flex justify-between items-center'>
                <div className='pr-36'>
                    <img width='102' src="/assets/Airbnb_Logo_Bélo.svg.png" alt="logo" />
                </div>
                <div className="border-[1px] w-full md:w-auto py-[7px] rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-sm font-bold px-4 pl-6 text-[#585858]">Anywhere</div>
                        <div className="hidden sm:block text-sm font-bold px-4 border-x-[1px] flex-1 text-center text-[#585858]">Any week</div>
                        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
                            <div className="hidden sm:block font-normal">Add guests</div>
                            <div className="p-[10px] bg-rose-500 rounded-full text-white">
                                <FaSearch className="text-[13px] " />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858]">Airbnb your home</div>
                        <div className="hidden md:block text-sm font-bold py-3 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858] mr-2"><TbWorld className='text-xl'></TbWorld></div>
                        <div onClick={() => setUserMenuToggle(!userMenuToggle)} className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition duration-300">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                            </svg>
                            <div className="hidden md:block">
                                <img alt="Avatar" loading="lazy" width="28" height="28" className="rounded-full select-none" src="https://airbnb-clone-phi-green.vercel.app/_next/image?url=%2Fimages%2Fplaceholder.jpg&w=32&q=75" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={userMenuToggle ? 'absolute z-10 right-20 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' : 'hidden'} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</a>
                                <form method="POST" action="#" role="none">
                                    <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;