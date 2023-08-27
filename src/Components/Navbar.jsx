import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Datepicker from "react-tailwindcss-datepicker";
import { LuSettings2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isBackdrop, setIsBackdrop, modalOpen, setModalOpen, cards, setCards }) => {
    const [userMenuToggle, setUserMenuToggle] = useState(false);
    const [openSearch, setOpenSearch] = useState(false)
    const [isExpand, setIsExpand] = useState(0)
    const handleSearchForm = () => {
        setIsBackdrop(!isBackdrop)
        setAdults(0);
        setInfants(0);
        setPets(0);
        setchildren(0);
        setValue(null);
        setOpenSearch(false);
        // document.getElementsByClassName('absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed')[0].classList.add('hidden')
    }
    const handleSearchFormMobile = () => {
        setIsBackdrop(false)
        setAdults(0);
        setInfants(0);
        setPets(0);
        setchildren(0);
        setValue(null);
        setOpenSearch(false);
        // document.getElementsByClassName('absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed')[0].classList.add('hidden')
    }
    const navigate = useNavigate();
    const [isSearchClick, setSearchClick] = useState(0)
    const [value, setValue] = useState({});

    const handleValueChange = (newValue) => {
        setValue(newValue);
    }

    const [dateMoueHover, setDateMouseHover] = useState();
    const [enddateMoueHover, setEndDateMouseHover] = useState();

    const [adults, setAdults] = useState(0);
    const [children, setchildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);

    const handleClear = () => {
        setAdults(0);
        setInfants(0);
        setPets(0);
        setchildren(0);
        setValue(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event?.target;
        const address = form?.address?.value
        const searchData = {
            address: address,
            check_in: value?.startDate,
            check_out: value?.endDate,
            adults: adults,
            infants: infants,
            pets: pets,
            children: children
        }

        axios.post(`http://localhost:5000/search`, searchData)
            .then(response => {
                navigate('/search')
                setCards(response.data)
                form.reset()
                handleSearchFormMobile()
            })
            .catch(error => {
                console.error(error);
            });

    }

    return (
        <div className={isBackdrop ? 'pt-4 pb-4 lg:px-20 md:px-0 w-full bg-white sticky h-[170px]' : 'pt-4 pb-4 lg:px-20 md:px-10 w-full bg-white h-[82px]'}>
            <div className='flex md:justify-between justify-center'>
                <div className='pr-36 mt-2 lg:block md:hidden hidden'>
                    <img width='102' src="/assets/Airbnb_Logo_Bélo.svg.png" alt="logo" />
                </div>
                {!isBackdrop && <div onClick={handleSearchForm} className="lock border-[1px] w-full md:w-auto py-[7px] rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer lg:block md:hidden hidden">
                    <div className="flex flex-row justify-between items-center">
                        <div onClick={() => setSearchClick(1)} className="text-sm font-bold px-4 pl-6 text-[#585858]">Anywhere</div>
                        <div onClick={() => setSearchClick(2)} className="hidden sm:block text-sm font-bold px-4 border-x-[1px] flex-1 text-center text-[#585858]">Any week</div>
                        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
                            <div onClick={() => setSearchClick(4)} className="hidden sm:block font-normal">Add guests</div>
                            <div onClick={() => setSearchClick(0)} className="p-[10px] bg-rose-500 rounded-full text-white">
                                <FaSearch className="text-[13px] " />
                            </div>
                        </div>
                    </div>
                </div>}
                <div style={{ transition: 'opacity .5s ease-in' }} className={isBackdrop ? 'lg:block opacity-100 md:hidden hidden' : 'opacity-0 hidden'}>
                    <div className='flex gap-8 mb-5 justify-center mt-3'>
                        <p className='border-b-neutral-800 border-b-2 pb-2'>Stays</p>
                        <p>Experiences</p>
                        <p>Online Experiences</p>
                    </div>
                    <div className={isSearchClick != 0 ? 'border rounded-full bg-gray-200' : 'border rounded-full'}>
                        <form onSubmit={handleSubmit} className="grid-cols-[0.8fr,0.7fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr,0.7fr,auto] grid flex-grow">
                            <span onClick={() => setSearchClick(1)} role="button" tabIndex="0" className={isSearchClick == 1 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                <div className="undefined flex flex-col flex-grow pl-7 pr-3 text-left"><span className="text-xs font-bold tracking-wider text-gray-800">Where</span>
                                    <input id='address' name='address' type="text" placeholder="Search destinations" className="w-full text-sm text-gray-700 placeholder-gray-500 truncate bg-transparent outline-none" />
                                </div>
                                <div className="border-r border-gray-200 flex items-center h-8">
                                    <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                </div>
                            </span>
                            <span onMouseOver={() => setDateMouseHover(true)} onMouseOut={() => setDateMouseHover(false)} onClick={() => setSearchClick(2)} role="button" tabIndex="0" className={isSearchClick == 2 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r border-l" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                <div className="flex flex-col flex-grow pl-7 text-left">
                                    <span className="text-xs font-bold tracking-wider text-gray-800">Check in</span>
                                    {/* <span className="text-sm text-gray-500 truncate max-w-[105px] lg:max-w-none">Add dates</span> */}
                                    <div>
                                        <Datepicker displayFormat={"MMM DD"} toggleClassName="" inputClassName={`text-sm w-28 placeholder:text-gray-500 text-gray-500 outline-0 w-20 ${isSearchClick == 2 || isSearchClick == 0 ? 'bg-white' : 'bg-gray-200'} ${dateMoueHover && isSearchClick != 2 ? 'bg-gray-300' : 'bg-gray-200'}`} primaryColor={"rose"} placeholder='Add dates' value={value} onChange={handleValueChange} />
                                    </div>
                                </div>
                                <div className="border-r border-gray-200 flex items-center h-8">
                                    <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="hidden mt-16">
                                    <div className="left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold"></div>
                                </div>
                            </span>
                            <span onMouseOver={() => setEndDateMouseHover(true)} onMouseOut={() => setEndDateMouseHover(false)} onClick={() => setSearchClick(3)} role="button" tabIndex="0" className={isSearchClick == 3 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r border-l" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                <div className="undefined flex flex-col flex-grow pl-7 pr-3 text-left">
                                    <span className="text-xs font-bold tracking-wider text-gray-800">Check out</span>
                                    <div>
                                        <Datepicker displayFormat={"MMM DD"} toggleClassName="" inputClassName={`text-sm w-28 placeholder:text-gray-500 text-gray-500 outline-0 w-20 ${isSearchClick == 3 || isSearchClick == 0 ? 'bg-white' : 'bg-gray-200'} ${enddateMoueHover && isSearchClick != 3 ? 'bg-gray-300' : 'bg-gray-200'}`} primaryColor={"rose"} placeholder='Add dates' value={value} onChange={handleValueChange} />
                                    </div>
                                </div>
                                <div className="border-r border-gray-200 flex items-center h-8">
                                    <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="hidden mt-16">
                                    <div className="left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold"></div>
                                </div>
                            </span>
                            <span role="button" tabIndex="0" className={isSearchClick == 4 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r border-l" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                <div onClick={() => setSearchClick(4)} className="min-w-[120px] flex flex-col flex-grow pl-7 pr-3 text-left">
                                    <span className="text-xs font-bold tracking-wider text-gray-800">Guests</span>
                                    <span className="text-sm text-gray-500 truncate max-w-[105px] lg:max-w-none">Add guests</span>
                                </div>
                                <div className="false flex items-center h-8">
                                    <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                </div>
                                <button type="submit" className={`${isSearchClick != 0 ? 'w-24' : 'w-16'} flex items-center justify-center m-2 ml-0 px-3 h-12  rounded-full bg-primary  hover:saturate-200`}>
                                    <div className="p-[15px] bg-rose-500 rounded-full text-white">
                                        <div className='flex items-center'>
                                            <FaSearch className="text-[15px]" />
                                            {isSearchClick != 0 && <span className="ml-2 font-medium text-white">Search</span>}
                                        </div>
                                    </div>
                                </button>
                                <div className={isSearchClick == 4 ? 'mt-16 shadow-2xl' : '"mt-16 hidden'}>
                                    <div className="right-0 w-96 absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold">
                                        <div>
                                            <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                <div className="flex-grow">
                                                    <h2 className="font-medium">Adults</h2>
                                                    <p className="text-sm leading-4 text-gray-500">Ages 13 or above</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button onClick={() => setAdults(adults - 1)} disabled={adults <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="inline-block text-center w-9">{adults}</span>
                                                    <button onClick={() => setAdults(adults + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                <div className="flex-grow">
                                                    <h2 className="font-medium">Children</h2>
                                                    <p className="text-sm leading-4 text-gray-500">Ages 2-12</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button onClick={() => setchildren(children - 1)} disabled={children <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="inline-block text-center w-9">{children}</span>
                                                    <button onClick={() => setchildren(children + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex py-4">
                                                <div className="flex-grow">
                                                    <h2 className="font-medium">Infants</h2>
                                                    <p className="text-sm leading-4 text-gray-500">Under 2</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button onClick={() => setInfants(infants - 1)} disabled={infants <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="inline-block text-center w-9">{infants}</span>
                                                    <button onClick={() => setInfants(infants + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex py-4">
                                                <div className="flex-grow">
                                                    <h2 className="font-medium">Pets</h2>
                                                    <p className="text-sm leading-4 text-gray-500 underline underline-offset-2">Bringing a service animal?</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button onClick={() => setPets(pets - 1)} disabled={pets <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="inline-block text-center w-9">{pets}</span>
                                                    <button onClick={() => setPets(pets + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>

                <div className='flex justify-center md:hidden shadow-xl rounded-full'>
                    <div className='w-100 border grid grid-cols-6 rounded-full py-1'>
                        <div onClick={() => setOpenSearch(!openSearch)} className='rounded-full mx-1 my-1'>
                            <button className='px-3 py-3'>
                                <FaSearch></FaSearch>
                            </button>
                        </div>
                        <div onClick={() => setOpenSearch(!openSearch)} className='col-span-4'>
                            <p>Anywhere</p>
                            <p className='text-sm text-gray-500'>Any week . Add guests</p>
                        </div>
                        <div className='border rounded-full mx-1 my-1'>
                            <button onClick={() => setModalOpen(!modalOpen)} className='px-3 py-3'>
                                <LuSettings2></LuSettings2>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='md:hidden block'>
                    {openSearch && <div className="fixed shadow-xl left-0 top-0 flex h-full w-full bg-gray-100 z-50 min-h-max">
                        <div className="max-h-full min-w-full overflow-y-auto sm:rounded-xl">
                            <form onSubmit={handleSubmit}>
                                <div className='sticky top-0 bg-gray-100 rounded-t-xl z-50'>
                                    <div className='py-3 grid grid-cols-3 items-center'>
                                        <div onClick={() => { setOpenSearch(!openSearch); setIsExpand(0) }} className='p-2 bg-white border border-black w-fit rounded-full cursor-pointer ml-4'>
                                            <RxCross2></RxCross2>
                                        </div>
                                        <div className='flex gap-5'>
                                            <p className='text-center font-semibold border-b-2 pb-1 border-black'>Stays</p>
                                            <p className='text-center font-semibold text-gray-500'>Experiences</p>
                                        </div>
                                    </div>
                                </div>
                                {isExpand != 0 && <div onClick={() => setIsExpand(0)} className='bg-white rounded-2xl mx-3 mt-3 shadow-xl flex justify-between px-5 py-4 items-center'>
                                    <p className='text-gray-500 font-semibold'>Where</p>
                                    <p>I'm flexible</p>
                                </div>}

                                {isExpand == 0 && <div className='bg-white rounded-2xl mx-3 mt-3 shadow-xl'>
                                    <div className='mx-5 py-5'>
                                        <p className='text-2xl font-bold'>Where to?</p>
                                        <div className='flex items-center gap-3 mt-3 border border-gray-400 rounded-xl py-4 pl-5'>
                                            <FaSearch className='text-gray-500'></FaSearch>
                                            <input id='address' name='address' className='outline-0' type="text" placeholder='Search Destinations' />
                                        </div>
                                    </div>
                                </div>}

                                {isExpand != 1 && <div onClick={() => setIsExpand(1)} className='bg-white rounded-2xl mx-3 mt-3 shadow-xl flex justify-between px-5 py-4 items-center'>
                                    <p className='text-gray-500 font-semibold'>When</p>
                                    <p>Add dates</p>
                                </div>}

                                {isExpand == 1 && <div className='bg-white rounded-2xl mx-3 mt-3 shadow-xl'>
                                    <div className='mx-5 py-5'>
                                        <p className='text-2xl font-bold'>When's your trip?</p>
                                        <div className='flex items-center gap-3 mt-3 border border-gray-400 rounded-xl py-4 pl-5'>
                                            <Datepicker useRange={false} displayFormat={"MMM DD"} inputClassName={`text-sm w-28 placeholder:text-gray-500 text-gray-500 outline-0`} primaryColor={"rose"} placeholder='Add dates' value={value} onChange={handleValueChange} />
                                        </div>
                                    </div>
                                </div>}

                                {isExpand != 2 && <div onClick={() => setIsExpand(2)} className='bg-white rounded-2xl mx-3 mt-3 shadow-xl flex justify-between px-5 py-4 items-center'>
                                    <p className='text-gray-500 font-semibold'>Who</p>
                                    <p>Add guests</p>
                                </div>}

                                {isExpand == 2 && <div className='bg-white rounded-2xl mx-3 mt-3 shadow-xl'>
                                    <div className='mx-5 py-5'>
                                        <p className='text-2xl font-bold'>Who's coming?</p>
                                        <div>
                                            <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                <div className="flex-grow">
                                                    <h2 className="font-medium">Adults</h2>
                                                    <p className="text-sm leading-4 text-gray-500">Ages 13 or above</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button onClick={() => setAdults(adults - 1)} role="button" disabled={adults <= 0 ? true : false} tabIndex="0" className="p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="inline-block text-center w-9">{adults}</span>
                                                    <button onClick={() => setAdults(adults + 1)} role="button" tabIndex="0" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                    <div className="flex-grow">
                                                        <h2 className="font-medium">Children</h2>
                                                        <p className="text-sm leading-4 text-gray-500">Ages 2-12</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <button onClick={() => setchildren(children - 1)} disabled={children <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                            </svg>
                                                        </button>
                                                        <span className="inline-block text-center w-9">{children}</span>
                                                        <button onClick={() => setchildren(children + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex py-4">
                                                    <div className="flex-grow">
                                                        <h2 className="font-medium">Infants</h2>
                                                        <p className="text-sm leading-4 text-gray-500">Under 2</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <button onClick={() => setInfants(infants - 1)} disabled={infants <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                            </svg>
                                                        </button>
                                                        <span className="inline-block text-center w-9">{infants}</span>
                                                        <button onClick={() => setInfants(infants + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex py-4">
                                                    <div className="flex-grow">
                                                        <h2 className="font-medium">Pets</h2>
                                                        <p className="text-sm leading-4 text-gray-500 underline underline-offset-2">Bringing a service animal?</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <button onClick={() => setPets(pets - 1)} disabled={pets <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                            </svg>
                                                        </button>
                                                        <span className="inline-block text-center w-9">{pets}</span>
                                                        <button onClick={() => setPets(pets + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}


                                <div className='fixed w-full bottom-0 grid grid-cols-2 items-center bg-white pt-4 border-t pb-3 rounded-b-xl'>
                                    <div onClick={handleClear} className='cursor-pointer font-semibold py-2 ml-5 w-fit underline hover:bg-gray-100 hover:rounded-xl hover:px-3 hover:mx-2'>Clear all</div>
                                    <div className='mx-5'>
                                        <button type='submit' className='float-right flex items-center gap-2 px-5 mb-1 bg-gradient-to-r from-[#e61e4f] via-[#e31c5f] to-[#d80665] text-white font-bold py-3 rounded-lg'><FaSearch></FaSearch>Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>}
                </div>

                <div className='lg:hidden md:flex hidden'>
                    <div className={isBackdrop ? 'hidden' : 'mt-2'}>
                        <img width='30' src="https://seeklogo.com/images/A/airbnb-logo-1D03C48906-seeklogo.com.png" alt="logo" />
                    </div>
                    {!isBackdrop && <div onClick={handleSearchForm} className="lock ml-7 border-[1px] w-full md:w-auto py-[7px] rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer lg:hidden">
                        <div className="flex flex-row justify-between items-center">
                            <div onClick={() => setSearchClick(1)} className="text-sm font-bold px-4 pl-6 text-[#585858]">Anywhere</div>
                            <div onClick={() => setSearchClick(2)} className="hidden sm:block text-sm font-bold px-4 border-x-[1px] flex-1 text-center text-[#585858]">Any week</div>
                            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
                                <div onClick={() => setSearchClick(4)} className="hidden sm:block font-normal">Add guests</div>
                                <div onClick={() => setSearchClick(0)} className="p-[10px] bg-rose-500 rounded-full text-white">
                                    <FaSearch className="text-[13px] " />
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div style={{ transition: 'opacity .5s ease-in' }} className={isBackdrop ? 'fixed right-0 left-0 opacity-100 lg:hidden' : 'opacity-0 hidden'}>
                        <div className='flex gap-8 mb-5 justify-center mt-3'>
                            <p className='border-b-neutral-800 border-b-2 pb-2'>Stays</p>
                            <p>Experiences</p>
                            <p>Online Experiences</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className={isSearchClick != 0 ? 'border rounded-full bg-gray-200' : 'border rounded-full'}>
                                <form onSubmit={handleSubmit} className="grid-cols-[0.8fr,0.7fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr,0.7fr,auto] grid flex-grow">
                                    <span onClick={() => setSearchClick(1)} role="button" tabIndex="0" className={isSearchClick == 1 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                        <div className="undefined flex flex-col flex-grow pl-7 pr-3 text-left"><span className="text-xs font-bold tracking-wider text-gray-800">Where</span>
                                            <input id='address' name='address' type="text" placeholder="Search destinations" className="w-full text-sm text-gray-700 placeholder-gray-500 truncate bg-transparent outline-none" />
                                        </div>
                                        <div className="border-r border-gray-200 flex items-center h-8">
                                            <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </span>
                                    <span onMouseOver={() => setDateMouseHover(true)} onMouseOut={() => setDateMouseHover(false)} onClick={() => setSearchClick(2)} role="button" tabIndex="0" className={isSearchClick == 2 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r border-l" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                        <div className="flex flex-col flex-grow pl-7 text-left">
                                            <span className="text-xs font-bold tracking-wider text-gray-800">Check in</span>
                                            {/* <span className="text-sm text-gray-500 truncate max-w-[105px] lg:max-w-none">Add dates</span> */}
                                            <div>
                                                <Datepicker useRange={false} displayFormat={"MMM DD"} toggleClassName="hidden" inputClassName={`text-sm w-28 placeholder:text-gray-500 text-gray-500 outline-0 w-20 ${isSearchClick == 2 || isSearchClick == 0 ? 'bg-white' : 'bg-gray-200'} ${dateMoueHover && isSearchClick != 2 ? 'bg-gray-300' : 'bg-gray-200'}`} primaryColor={"rose"} placeholder='Add dates' value={value} onChange={handleValueChange} />
                                            </div>
                                        </div>
                                        <div className="border-r border-gray-200 flex items-center h-8">
                                            <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="hidden mt-16">
                                            <div className="left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold"></div>
                                        </div>
                                    </span>
                                    <span onMouseOver={() => setEndDateMouseHover(true)} onMouseOut={() => setEndDateMouseHover(false)} onClick={() => setSearchClick(3)} role="button" tabIndex="0" className={isSearchClick == 3 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r border-l" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                        <div className="undefined flex flex-col flex-grow pl-7 pr-3 text-left">
                                            <span className="text-xs font-bold tracking-wider text-gray-800">Check out</span>
                                            <div>
                                                <Datepicker useRange={false} displayFormat={"MMM DD"} toggleClassName="hidden" inputClassName={`text-sm w-28 placeholder:text-gray-500 text-gray-500 outline-0 w-20 ${isSearchClick == 3 || isSearchClick == 0 ? 'bg-white' : 'bg-gray-200'} ${enddateMoueHover && isSearchClick != 3 ? 'bg-gray-300' : 'bg-gray-200'}`} primaryColor={"rose"} placeholder='Add dates' value={value} onChange={handleValueChange} />
                                            </div>
                                        </div>
                                        <div className="border-r border-gray-200 flex items-center h-8">
                                            <div role="button" tabIndex="0" className="opacity-0 flex items-center pr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="hidden mt-16">
                                            <div className="left-4 right-4 searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold"></div>
                                        </div>
                                    </span>
                                    <span onClick={() => setSearchClick(4)} role="button" tabIndex="0" className={isSearchClick == 4 ? "relative flex items-center rounded-full bg-white drop-shadow-xl border-r border-l" : "hover:bg-gray-300 hover:bg-opacity-100 relative flex items-center rounded-full"}>
                                        <div className="min-w-[120px] flex flex-col flex-grow pl-7 pr-3 text-left">
                                            <span className="text-xs font-bold tracking-wider text-gray-800">Guests</span>
                                            <span className="text-sm text-gray-500 truncate max-w-[105px] lg:max-w-none">Add guests</span>
                                        </div>
                                        <button type="submit" className='w-16 flex items-center justify-center m-2 ml-0 px-3 h-12  rounded-full bg-primary  hover:saturate-200'>
                                            <div className="p-[15px] bg-rose-500 rounded-full text-white">
                                                <div className='flex items-center'>
                                                    <FaSearch className="text-[15px]" />
                                                </div>
                                            </div>
                                        </button>
                                        <div className={isSearchClick == 4 ? 'mt-16 shadow-2xl' : '"mt-16 hidden'}>
                                            <div className="right-0 w-96 absolute px-8 py-4 mt-3 bg-white rounded-3xl shadow-arround-bold">
                                                <div>
                                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Adults</h2>
                                                            <p className="text-sm leading-4 text-gray-500">Ages 13 or above</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button type="button" onClick={() => setAdults(adults - 1)} disabled={adults <= 0 ? true : false} className="p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                                </svg>
                                                            </button>
                                                            <span className="inline-block text-center w-9">{adults}</span>
                                                            <button type="button" onClick={() => setAdults(adults + 1)} className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex py-4 border-b border-gray-200 border-opacity-70">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Children</h2>
                                                            <p className="text-sm leading-4 text-gray-500">Ages 2-12</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button type="button" onClick={() => setchildren(children - 1)} disabled={children <= 0 ? true : false} className="p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                                </svg>
                                                            </button>
                                                            <span className="inline-block text-center w-9">{children}</span>
                                                            <button onClick={() => setchildren(children + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex py-4">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Infants</h2>
                                                            <p className="text-sm leading-4 text-gray-500">Under 2</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button onClick={() => setInfants(infants - 1)} disabled={infants <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                                </svg>
                                                            </button>
                                                            <span className="inline-block text-center w-9">{infants}</span>
                                                            <button onClick={() => setInfants(infants + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex py-4">
                                                        <div className="flex-grow">
                                                            <h2 className="font-medium">Pets</h2>
                                                            <p className="text-sm leading-4 text-gray-500 underline underline-offset-2">Bringing a service animal?</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <button onClick={() => setPets(pets - 1)} disabled={pets <= 0 ? true : false} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                                                </svg>
                                                            </button>
                                                            <span className="inline-block text-center w-9">{pets}</span>
                                                            <button onClick={() => setPets(pets + 1)} type="button" className="false btnIncrease p-[7px] border border-gray-300 rounded-full border-opacity-70 inline-block outline-none active:scale-90 duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 text-gray-300">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={isBackdrop ? 'lg:block md:hidden hidden' : 'block'}>
                    <div className="flex flex-row items-center justify-between">
                        <div className={`hidden md:block text-sm font-bold lg:py-3 lg:px-4 md:p-0 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858]`}>Airbnb your home</div>
                        <div className="hidden md:block text-sm font-bold py-3 px-3 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858] mr-2">
                            <TbWorld className='text-xl'></TbWorld>
                        </div>
                        <div onClick={() => setUserMenuToggle(!userMenuToggle)} className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 md:flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition duration-300 hidden">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
                            </svg>
                            <div className="hidden md:block">
                                <img alt="Avatar" loading="lazy" width="28" height="28" className="rounded-full select-none" src="https://airbnb-clone-phi-green.vercel.app/_next/image?url=%2Fimages%2Fplaceholder.jpg&w=32&q=75" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={userMenuToggle ? 'absolute right-20 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' : 'hidden'} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 font-semibold mt-1 py-3" role="menuitem" tabIndex="-1" id="menu-item-0">Sign up</a>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 py-3 mb-2" role="menuitem" tabIndex="-1" id="menu-item-0">Login</a>
                                <hr />
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 mt-2 py-3" role="menuitem" tabIndex="-1" id="menu-item-0">Airbnb your home</a>
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 py-3 mb-1" role="menuitem" tabIndex="-1" id="menu-item-0">Help Center</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Navbar;