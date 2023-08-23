import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll();
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

    return (
        <div className='px-20 mt-6'>
            <div className='flex items-center gap-10 justify-between'>
                <button onClick={() => scrollTo(-100)} className={isAtStart ? 'hidden' : 'md:block text-sm font-bold py-0 px-0 rounded-full border border-slate-400 hover:shadow-xl'}>
                    <MdKeyboardArrowLeft className='text-2xl'></MdKeyboardArrowLeft>
                </button>
                <div className='flex gap-10 overflow-x-auto items-center scrollbar-hide' ref={scrollContainerRef} onScroll={handleScroll}>
                    {categories?.map((category, index) =>
                        <NavLink key={index} to={`/category/${category?._id}`} className={({ isActive }) => isActive ? `flex flex-col max-w-fit items-center justify-center gap-1 py-2 border-b-2 hover:text-neutral-800 transition cursor-pointer border-b-neutral-800 text-neutral-800 hover:border-b-neutral-800 hover:text-neutral-800 min-w-fit` : "flex flex-col max-w-fit items-center justify-center gap-1 py-2 border-b-2 transition cursor-pointer border-transparent text-neutral-800 opacity-60 hover:opacity-100 hover:border-b-neutral-300 min-w-fit"}>
                            <img width='24.5' src={category?.category_icon} alt="" />
                            <div className="font-medium text-[12.5px] select-none">{category?.category_name}</div>
                        </NavLink>
                    )}
                    {isLoading && Array.apply(null, { length: 30 }).map((e, i) => (
                        <NavLink key={i} className={"flex flex-col max-w-fit items-center justify-center gap-1 py-2 border-b-2 border-transparent text-neutral-800 min-w-fit"}>
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
                    <button onClick={() => scrollTo(100)} className={isAtEnd && !isAtStart ? 'hidden' : 'md:block text-sm font-bold py-0 px-0 rounded-full border border-slate-400 hover:shadow-xl'}>
                        <MdKeyboardArrowRight className='text-2xl'></MdKeyboardArrowRight>
                    </button>
                    <div className='border rounded-lg'>
                        <button className='flex items-center gap-2 px-4 py-3'>
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