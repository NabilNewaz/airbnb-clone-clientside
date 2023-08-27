import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import axios from 'axios';

import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';
import RangeSlider from "react-range-slider-input";

import { BsDashLg } from "react-icons/bs";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

import "react-range-slider-input/dist/style.css";
import "./styles.css";

const Categories = ({ modalOpen, setModalOpen, setCards }) => {
    const navigate = useNavigate()

    const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll();

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState();

    const [selectedType, setSellectedType] = useState(0)
    const [selectedBedroom, setSellectedBedroom] = useState(0)
    const [selectedBeds, setSellectedBeds] = useState(0)
    const [selectedBathrooms, setSellectedBathrooms] = useState(0)
    const [selectedPropertyTypes, setSellectedPropertyTypes] = useState(0)

    const [value, setValue] = useState([10, 300]);

    useEffect(() => {
        axios.get(`http://localhost:5000/get-categories`)
            .then(response => {
                setCategories(response.data);
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleModalOpenData = () => {
        axios.get(`http://localhost:5000/get-all-cards`)
            .then(response => {
                setFilterData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        const filterData = {
            type: selectedType,
            range: value,
            bed: selectedBeds,
            bedroom: selectedBedroom,
            bathroom: selectedBathrooms,
            propertyType: selectedPropertyTypes
        }

        axios.post(`http://localhost:5000/filter`, filterData)
            .then(response => {
                setFilterData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [selectedType, selectedBeds, value[0], value[1], selectedBathrooms, selectedBedroom, selectedPropertyTypes])

    return (
        <div className='lg:px-20 md:px-10 px-5 mt-4 z-50'>

            <div className='md:block hidden'>
                {modalOpen && <div className="fixed shadow-xl left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50 min-h-max">
                    <div className="max-h-full min-w-max max-w-xl overflow-y-auto rounded-xl bg-white scrollbar-hide">

                        <div className='sticky top-0 bg-white rounded-t-xl z-50'>
                            <div className='py-5 grid grid-cols-3 font-bold border-b items-center'>
                                <div onClick={() => { setModalOpen(!modalOpen); setSellectedType(0); setSellectedPropertyTypes(0) }} className='p-2 hover:bg-gray-100 w-fit rounded-full cursor-pointer ml-4'>
                                    <RxCross2></RxCross2>
                                </div>
                                <div>
                                    <p className=' text-center'>Filters</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <div className='mx-5'>
                                <p className='text-xl font-bold'>Type of place</p>
                                <p className='text-md mt-1'>Search rooms, entire homes and more. Nightly prices don't include fees or taxes.</p>
                            </div>

                            <div className='mx-10 md:w-100  border rounded-xl flex justify-around mt-5 mb-6'>
                                <div onClick={() => setSellectedType('any type')} className={`cursor-pointer py-4 w-full border-r flex flex-col text-center ${selectedType == 'any type' ? 'bg-gradient-to-b from-[#3e3e3e] via-[#3b3b3b] to-[#202020] rounded-l-xl shadow-inner shadow-black' : ''}`}>
                                    <span className={`${selectedType == 'any type' ? 'text-white' : 'text-black'} text-sm font-bold`}>Any Type</span>
                                    <span className={`${selectedType == 'any type' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>$107 avg.</span>
                                </div>
                                <div onClick={() => setSellectedType('room')} className={`cursor-pointer py-4 w-full border-r flex flex-col text-center ${selectedType == 'room' ? 'bg-gradient-to-b from-[#3e3e3e] via-[#3b3b3b] to-[#202020] shadow-inner shadow-black' : ''}`}>
                                    <span className={`${selectedType == 'room' ? 'text-white' : 'text-black'} text-sm font-bold`}>Room</span>
                                    <span className={`${selectedType == 'room' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>$56 avg.</span>
                                </div>
                                <div onClick={() => setSellectedType('entire home')} className={`cursor-pointer py-4 w-full text-center flex flex-col ${selectedType == 'entire home' ? 'bg-gradient-to-b from-[#3e3e3e] via-[#3b3b3b] to-[#202020] rounded-r-xl shadow-inner shadow-black' : ''}`}>
                                    <span className={`${selectedType == 'entire home' ? 'text-white' : 'text-black'} text-sm font-bold`}>Entire Home</span>
                                    <span className={`${selectedType == 'entire home' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>$120 avg.</span>
                                </div>
                            </div>
                            <div className='mt-4 mx-5 border-t'>
                                <p className='text-xl font-bold mt-5'>Price range</p>
                            </div>
                            <div className='mt-10 mb-11 mx-10'>
                                <RangeSlider id='range-slider' min={10} max={300} className="h-[3px]" value={value} onInput={setValue} />
                            </div>
                            <div className='flex mx-10 gap-3 items-center mb-5 pb-7 border-b'>
                                <div className='border w-full py-2 rounded-xl'>
                                    <p className='text-sm text-gray-400 ml-3'>Minimum</p>
                                    <p className='text-md ml-3'>$ {value[0]}</p>
                                </div>
                                <div className='text-gray-400'>
                                    <BsDashLg></BsDashLg>
                                </div>
                                <div className='border w-full py-2 rounded-xl'>
                                    <p className='text-sm text-gray-400 ml-3'>Maximum</p>
                                    <p className='text-md ml-3'>$ {value[1] == 300 ? `${value[1]}+` : value[1]}</p>
                                </div>
                            </div>
                            <div className='mx-5 mb-5 border-b pb-8'>
                                <div>
                                    <p className='text-xl font-bold mt-5'>Rooms and beds</p>
                                </div>
                                <div className='mt-5'>
                                    <p className='mb-3'>Bedrooms</p>
                                    <div className='flex gap-2'>
                                        <button onClick={() => setSellectedBedroom(0)} className={selectedBedroom == 0 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>Any</button>
                                        <button onClick={() => setSellectedBedroom(1)} className={selectedBedroom == 1 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>1</button>
                                        <button onClick={() => setSellectedBedroom(2)} className={selectedBedroom == 2 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>2</button>
                                        <button onClick={() => setSellectedBedroom(3)} className={selectedBedroom == 3 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>3</button>
                                        <button onClick={() => setSellectedBedroom(4)} className={selectedBedroom == 4 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>4</button>
                                        <button onClick={() => setSellectedBedroom(5)} className={selectedBedroom == 5 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>5</button>
                                        <button onClick={() => setSellectedBedroom(6)} className={selectedBedroom == 6 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>6</button>
                                        <button onClick={() => setSellectedBedroom(7)} className={selectedBedroom == 7 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>7</button>
                                        <button onClick={() => setSellectedBedroom(8)} className={selectedBedroom == 8 ? 'border px-5 py-2 rounded-full bg-black text-white' : 'border px-5 py-2 rounded-full hover:border-black'}>8+</button>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <p className='mb-3'>Beds</p>
                                    <div className='flex gap-2'>
                                        <button onClick={() => setSellectedBeds(0)} className={selectedBeds == 0 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>Any</button>
                                        <button onClick={() => setSellectedBeds(1)} className={selectedBeds == 1 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>1</button>
                                        <button onClick={() => setSellectedBeds(2)} className={selectedBeds == 2 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>2</button>
                                        <button onClick={() => setSellectedBeds(3)} className={selectedBeds == 3 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>3</button>
                                        <button onClick={() => setSellectedBeds(4)} className={selectedBeds == 4 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>4</button>
                                        <button onClick={() => setSellectedBeds(5)} className={selectedBeds == 5 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>5</button>
                                        <button onClick={() => setSellectedBeds(6)} className={selectedBeds == 6 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>6</button>
                                        <button onClick={() => setSellectedBeds(7)} className={selectedBeds == 7 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>7</button>
                                        <button onClick={() => setSellectedBeds(8)} className={selectedBeds == 8 ? 'border px-5 py-2 rounded-full bg-black text-white' : 'border px-5 py-2 rounded-full hover:border-black'}>8+</button>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <p className='mb-3'>Bathrooms</p>
                                    <div className='flex gap-2'>
                                        <button onClick={() => setSellectedBathrooms(0)} className={selectedBathrooms == 0 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>Any</button>
                                        <button onClick={() => setSellectedBathrooms(1)} className={selectedBathrooms == 1 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>1</button>
                                        <button onClick={() => setSellectedBathrooms(2)} className={selectedBathrooms == 2 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>2</button>
                                        <button onClick={() => setSellectedBathrooms(3)} className={selectedBathrooms == 3 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>3</button>
                                        <button onClick={() => setSellectedBathrooms(4)} className={selectedBathrooms == 4 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>4</button>
                                        <button onClick={() => setSellectedBathrooms(5)} className={selectedBathrooms == 5 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>5</button>
                                        <button onClick={() => setSellectedBathrooms(6)} className={selectedBathrooms == 6 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>6</button>
                                        <button onClick={() => setSellectedBathrooms(7)} className={selectedBathrooms == 7 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>7</button>
                                        <button onClick={() => setSellectedBathrooms(8)} className={selectedBathrooms == 8 ? 'border px-5 py-2 rounded-full bg-black text-white' : 'border px-5 py-2 rounded-full hover:border-black'}>8+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-5 mx-5'>
                            <div>
                                <p className='text-xl font-bold mt-5'>Property types</p>
                            </div>
                            <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
                                <div onClick={() => setSellectedPropertyTypes('house')} className={selectedPropertyTypes == 'house' ? 'mt-5 border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'mt-5 border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg" alt="" />
                                    <p className='font-semibold mt-8'>House</p>
                                </div>
                                <div onClick={() => setSellectedPropertyTypes('apartment')} className={selectedPropertyTypes == 'apartment' ? 'mt-5 border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'mt-5 border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg" alt="" />
                                    <p className='font-semibold mt-8'>Apartment</p>
                                </div>
                                <div onClick={() => setSellectedPropertyTypes('guesthouse')} className={selectedPropertyTypes == 'guesthouse' ? 'mt-5 border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'mt-5 border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg" alt="" />
                                    <p className='font-semibold mt-8'>Guesthouse</p>
                                </div>
                                <div onClick={() => setSellectedPropertyTypes('hotel')} className={selectedPropertyTypes == 'hotel' ? 'mt-5 border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'mt-5 border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg" alt="" />
                                    <p className='font-semibold mt-8'>Hotel</p>
                                </div>
                            </div>
                        </div>
                        <div className='sticky bottom-0 grid grid-cols-2 items-center bg-white pt-4 border-t pb-3 rounded-b-xl'>
                            <div className='cursor-pointer font-semibold py-2 mx-5 underline hover:bg-gray-100 w-fit hover:rounded-xl hover:px-3 hover:mx-2'>Clear All</div>
                            <div>
                                <button onClick={() => { setCards(filterData); setModalOpen(!modalOpen); navigate('/filter'); }} className='float-right px-5 mb-1 bg-black text-white font-bold py-3 rounded-lg mx-5 '>Show {filterData?.length} places</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            <div className='md:hidden block'>
                {modalOpen && <div className="fixed shadow-xl left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50 min-h-max">
                    <div className="max-h-full min-w-screen max-w-xl overflow-y-auto sm:rounded-xl bg-white">

                        <div className='sticky top-0 bg-white rounded-t-xl z-50'>
                            <div className='py-3 grid grid-cols-3 font-bold border-b items-center'>
                                <div onClick={() => { setModalOpen(!modalOpen); setSellectedType(0); setSellectedPropertyTypes(0); }} className='p-2 hover:bg-gray-100 w-fit rounded-full cursor-pointer ml-4'>
                                    <RxCross2></RxCross2>
                                </div>
                                <div>
                                    <p className=' text-center'>Filters</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <div className='mx-5'>
                                <p className='text-xl font-bold'>Type of place</p>
                                <p className='text-md mt-1'>Search rooms, entire homes and more. Nightly prices don't include fees or taxes.</p>
                            </div>

                            <div className='mx-5 md:w-100  border rounded-xl flex justify-around mt-5 mb-6'>
                                <div onClick={() => setSellectedType('any type')} className={`cursor-pointer py-4 w-full border-r flex flex-col text-center ${selectedType == 'any type' ? 'bg-gradient-to-b from-[#3e3e3e] via-[#3b3b3b] to-[#202020] rounded-l-xl shadow-inner shadow-black' : ''}`}>
                                    <span className={`${selectedType == 'any type' ? 'text-white' : 'text-black'} text-sm font-bold`}>Any Type</span>
                                    <span className={`${selectedType == 'any type' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>$107 avg.</span>
                                </div>
                                <div onClick={() => setSellectedType('room')} className={`cursor-pointer py-4 w-full border-r flex flex-col text-center ${selectedType == 'room' ? 'bg-gradient-to-b from-[#3e3e3e] via-[#3b3b3b] to-[#202020] shadow-inner shadow-black' : ''}`}>
                                    <span className={`${selectedType == 'room' ? 'text-white' : 'text-black'} text-sm font-bold`}>Room</span>
                                    <span className={`${selectedType == 'room' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>$56 avg.</span>
                                </div>
                                <div onClick={() => setSellectedType('entire home')} className={`cursor-pointer py-4 w-full text-center flex flex-col ${selectedType == 'entire home' ? 'bg-gradient-to-b from-[#3e3e3e] via-[#3b3b3b] to-[#202020] rounded-r-xl shadow-inner shadow-black' : ''}`}>
                                    <span className={`${selectedType == 'entire home' ? 'text-white' : 'text-black'} text-sm font-bold`}>Entire Home</span>
                                    <span className={`${selectedType == 'entire home' ? 'text-gray-300' : 'text-gray-500'} text-sm`}>$120 avg.</span>
                                </div>
                            </div>
                            <div className='mt-4 mx-5 border-t'>
                                <p className='text-xl font-bold mt-5'>Price range</p>
                            </div>
                            <div className='mt-10 mb-11 mx-5'>
                                <RangeSlider id='range-slider' min={10} max={300} className="h-[3px]" value={value} onInput={setValue} />
                            </div>
                            <div className='flex mx-5 gap-3 items-center mb-5 pb-7 border-b'>
                                <div className='border w-full py-2 rounded-xl'>
                                    <p className='text-sm text-gray-400 ml-3'>Minimum</p>
                                    <p className='text-md ml-3'>$ {value[0]}</p>
                                </div>
                                <div className='text-gray-400'>
                                    <BsDashLg></BsDashLg>
                                </div>
                                <div className='border w-full py-2 rounded-xl'>
                                    <p className='text-sm text-gray-400 ml-3'>Maximum</p>
                                    <p className='text-md ml-3'>$ {value[1] == 300 ? `${value[1]}+` : value[1]}</p>
                                </div>
                            </div>
                            <div className='mx-5 mb-5 border-b pb-8'>
                                <div>
                                    <p className='text-xl font-bold mt-5'>Rooms and beds</p>
                                </div>
                                <div className='mt-5'>
                                    <p className='mb-3'>Bedrooms</p>
                                    <div className='flex gap-2 overflow-scroll scrollbar-hide'>
                                        <button onClick={() => setSellectedBedroom(0)} className={selectedBedroom == 0 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>Any</button>
                                        <button onClick={() => setSellectedBedroom(1)} className={selectedBedroom == 1 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>1</button>
                                        <button onClick={() => setSellectedBedroom(2)} className={selectedBedroom == 2 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>2</button>
                                        <button onClick={() => setSellectedBedroom(3)} className={selectedBedroom == 3 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>3</button>
                                        <button onClick={() => setSellectedBedroom(4)} className={selectedBedroom == 4 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>4</button>
                                        <button onClick={() => setSellectedBedroom(5)} className={selectedBedroom == 5 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>5</button>
                                        <button onClick={() => setSellectedBedroom(6)} className={selectedBedroom == 6 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>6</button>
                                        <button onClick={() => setSellectedBedroom(7)} className={selectedBedroom == 7 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>7</button>
                                        <button onClick={() => setSellectedBedroom(8)} className={selectedBedroom == 8 ? 'border px-5 py-2 rounded-full bg-black text-white' : 'border px-5 py-2 rounded-full hover:border-black'}>8+</button>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <p className='mb-3'>Beds</p>
                                    <div className='flex gap-2 overflow-scroll scrollbar-hide'>
                                        <button onClick={() => setSellectedBeds(0)} className={selectedBeds == 0 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>Any</button>
                                        <button onClick={() => setSellectedBeds(1)} className={selectedBeds == 1 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>1</button>
                                        <button onClick={() => setSellectedBeds(2)} className={selectedBeds == 2 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>2</button>
                                        <button onClick={() => setSellectedBeds(3)} className={selectedBeds == 3 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>3</button>
                                        <button onClick={() => setSellectedBeds(4)} className={selectedBeds == 4 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>4</button>
                                        <button onClick={() => setSellectedBeds(5)} className={selectedBeds == 5 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>5</button>
                                        <button onClick={() => setSellectedBeds(6)} className={selectedBeds == 6 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>6</button>
                                        <button onClick={() => setSellectedBeds(7)} className={selectedBeds == 7 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>7</button>
                                        <button onClick={() => setSellectedBeds(8)} className={selectedBeds == 8 ? 'border px-5 py-2 rounded-full bg-black text-white' : 'border px-5 py-2 rounded-full hover:border-black'}>8+</button>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <p className='mb-3'>Bathrooms</p>
                                    <div className='flex gap-2 overflow-scroll scrollbar-hide'>
                                        <button onClick={() => setSellectedBathrooms(0)} className={selectedBathrooms == 0 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>Any</button>
                                        <button onClick={() => setSellectedBathrooms(1)} className={selectedBathrooms == 1 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>1</button>
                                        <button onClick={() => setSellectedBathrooms(2)} className={selectedBathrooms == 2 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>2</button>
                                        <button onClick={() => setSellectedBathrooms(3)} className={selectedBathrooms == 3 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>3</button>
                                        <button onClick={() => setSellectedBathrooms(4)} className={selectedBathrooms == 4 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>4</button>
                                        <button onClick={() => setSellectedBathrooms(5)} className={selectedBathrooms == 5 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>5</button>
                                        <button onClick={() => setSellectedBathrooms(6)} className={selectedBathrooms == 6 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>6</button>
                                        <button onClick={() => setSellectedBathrooms(7)} className={selectedBathrooms == 7 ? 'border px-6 py-2 rounded-full bg-black text-white' : 'border px-6 py-2 rounded-full hover:border-black'}>7</button>
                                        <button onClick={() => setSellectedBathrooms(8)} className={selectedBathrooms == 8 ? 'border px-5 py-2 rounded-full bg-black text-white' : 'border px-5 py-2 rounded-full hover:border-black'}>8+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-5 mx-5'>
                            <div>
                                <p className='text-xl font-bold mt-5'>Property types</p>
                            </div>
                            <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
                                <div onClick={() => setSellectedPropertyTypes('house')} className={selectedPropertyTypes == 'house' ? 'mt-5 border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'mt-5 border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/4d7580e1-4ab2-4d26-a3d6-97f9555ba8f9.jpg" alt="" />
                                    <p className='font-semibold mt-8'>House</p>
                                </div>
                                <div onClick={() => setSellectedPropertyTypes('apartment')} className={selectedPropertyTypes == 'apartment' ? 'mt-5 border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'mt-5 border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/21cfc7c9-5457-494d-9779-7b0c21d81a25.jpg" alt="" />
                                    <p className='font-semibold mt-8'>Apartment</p>
                                </div>
                                <div onClick={() => setSellectedPropertyTypes('guesthouse')} className={selectedPropertyTypes == 'guesthouse' ? 'border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/6f261426-2e47-4c91-8b1a-7a847da2b21b.jpg" alt="" />
                                    <p className='font-semibold mt-8'>Guesthouse</p>
                                </div>
                                <div onClick={() => setSellectedPropertyTypes('hotel')} className={selectedPropertyTypes == 'hotel' ? 'border p-4 rounded-xl w-40 border-2 border-black cursor-pointer bg-gray-100' : 'border p-4 rounded-xl w-40 hover:border hover:border-black cursor-pointer'}>
                                    <img width='35' src="https://a0.muscache.com/pictures/64b27fed-56a1-4f03-950a-d8da08efb428.jpg" alt="" />
                                    <p className='font-semibold mt-8'>Hotel</p>
                                </div>
                            </div>
                        </div>
                        <div className='sticky bottom-0 grid grid-cols-2 items-center bg-white pt-4 border-t pb-3 rounded-b-xl'>
                            <div className='cursor-pointer font-semibold py-2 ml-5 w-fit underline hover:bg-gray-100 hover:rounded-xl hover:px-3 hover:mx-2'>Clear All</div>
                            <div className=''>
                                <button onClick={() => { setCards(filterData); setModalOpen(!modalOpen); navigate('/filter'); }} className='float-left px-5 mb-1 bg-black text-white font-bold py-3 rounded-lg'>Show {filterData?.length} places</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            <div className='flex items-center gap-0 md:gap-10 justify-between'>
                <button onClick={() => scrollTo(-100)} className={isAtStart ? 'hidden' : 'md:block hidden text-sm font-bold py-0 px-0 rounded-full border border-slate-400 hover:shadow-xl'}>
                    <MdKeyboardArrowLeft className='text-2xl'></MdKeyboardArrowLeft>
                </button>
                <div className='flex md:gap-10 gap-7 overflow-x-auto items-center scrollbar-hide' ref={scrollContainerRef} onScroll={handleScroll}>
                    {categories?.map((category, index) =>
                        <NavLink key={index} to={`/category/${category?._id}`} className={({ isActive }) => isActive ? `flex flex-col max-w-fit items-center justify-center gap-1 py-3 border-b-2 hover:text-neutral-800 transition cursor-pointer border-b-neutral-800 text-neutral-800 hover:border-b-neutral-800 hover:text-neutral-800 min-w-fit` : "flex flex-col max-w-fit items-center justify-center gap-1 py-3 border-b-2 transition cursor-pointer border-transparent text-neutral-800 opacity-60 hover:opacity-100 hover:border-b-neutral-300 min-w-fit"}>
                            <img width='24.5' src={category?.category_icon} alt="" />
                            <div className="font-medium text-[12.5px] select-none">{category?.category_name}</div>
                        </NavLink>
                    )}
                    {isLoading && Array.apply(null, { length: 30 }).map((e, i) => (
                        <NavLink key={i} className={"flex flex-col max-w-fit items-center justify-center gap-1 border-b-2 border-transparent text-neutral-800 py-3 min-w-fit"}>
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-slate-200 h-7 w-7"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-1">
                                <div className="h-2 bg-slate-200 rounded col-span-5 py-[5px]"></div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <div className='flex gap-5 items-center'>
                    <button onClick={() => scrollTo(100)} className={isAtEnd && !isAtStart ? 'hidden' : 'md:block hidden text-sm font-bold py-0 px-0 rounded-full border border-slate-400 hover:shadow-xl'}>
                        <MdKeyboardArrowRight className='text-2xl'></MdKeyboardArrowRight>
                    </button>
                    <div className='border rounded-lg md:block hidden'>
                        <button onClick={() => { setModalOpen(!modalOpen); handleModalOpenData(); }} className='flex items-center gap-2 px-4 py-3'>
                            <LuSettings2></LuSettings2>
                            <span>Filters</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;