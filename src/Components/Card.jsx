import React, { useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Card = ({ data }) => {
    const [imageView, setImageView] = useState(0)
    const [leftSlide, setLeftSlide] = useState(false)
    const [rightSlide, setRightSlide] = useState(false)

    const handleSlideHover = () => {
        imageView != 0 && setLeftSlide(true)
        imageView != data?.images?.length - 1 && setRightSlide(true)
    }

    const handleSlideHoverOut = () => {
        setLeftSlide(false)
        setRightSlide(false)
    }

    return (
        <div onMouseOver={handleSlideHover} onMouseOut={handleSlideHoverOut} className=''>
            <div className='bg-cover bg-center w-full  h-[304px] rounded-xl transition-all p-0 m-0' style={{ backgroundImage: `url('${data?.images[imageView]}')` }}>
                <button onClick={() => setImageView(imageView - 1 < 0 ? data?.images?.length - 1 : imageView - 1)} className={(imageView == 0 || !leftSlide) ? 'hidden opacity-80 hover:opacity-100 text-sm font-bold mt-[45%] ml-2 py-1 px-1 bg-white rounded-full border border-slate-400 hover:shadow-xl float-left' : 'text-sm opacity-80 hover:opacity-100 font-bold mt-[45%] ml-2 py-1 px-1 bg-white rounded-full border border-slate-400 hover:shadow-xl float-left'}>
                    <MdKeyboardArrowLeft className='text-xl'></MdKeyboardArrowLeft>
                </button>
                <button onClick={() => setImageView(imageView + 1 < data?.images?.length ? imageView + 1 : 0)} className={(imageView == data?.images?.length - 1 || !rightSlide) ? 'hidden opacity-80 hover:opacity-100 text-sm font-bold mt-[45%] float-right mr-2 py-1 px-1 bg-white rounded-full border border-slate-400 hover:shadow-xl' : 'text-sm font-bold mt-[45%] float-right mr-2 py-1 px-1 bg-white rounded-full border border-slate-400 hover:shadow-xl opacity-80 hover:opacity-100'}>
                    <MdKeyboardArrowRight className='text-xl'></MdKeyboardArrowRight>
                </button>
                <div className={'relative left-[45%] top-[94%]'}>
                    <div className='flex absolute gap-1'>
                        {data.images?.map((img, index) =>
                            <div key={index} className={(index == imageView) ? "rounded-full bg-slate-100 w-1.5 h-1.5" : "rounded-full opacity-50 bg-slate-100 w-1.5 h-1.5"}></div>
                        )}
                    </div>
                </div>
                <div className={(leftSlide && imageView > 0) ? 'relative left-[76%] top-[4%]' : 'relative left-[88%] top-[4%]'}>
                    <div className='text-white cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"
                            style={
                                {
                                    "display": "block",
                                    "fill": "rgba(0, 0, 0, 0.5)",
                                    "height": "24px", "width": "24px", "stroke": "#fff", "stroke-width": "2", "overflow": "visible"
                                }
                            }><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
                    </div>
                </div>
            </div>
            <div className='space-y-1'>
                <div className='space-y-[-2px]'>
                    <div className='mt-2 flex items-center justify-between w-[318px]'>
                        <p className='font-semibold'>{data?.title}</p>
                        <div className='flex items-center'>
                            <AiFillStar className='text-sm'></AiFillStar>
                            <p className='ml-1'>{data?.rating}</p>
                        </div>
                    </div>
                    <div className='space-y-[-2px]'>
                        <p className='text-gray-500'>{data?.address}</p>
                        <p className='text-gray-500'>{data?.date_range}</p>
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>${data?.price} <span className='font-normal'>{data?.per_time}</span></p>
                </div>
            </div>
        </div >
    );
};

export default Card;