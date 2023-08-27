import React, { useEffect } from 'react';
import CardOption from './CardOption';
import Card from './Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CardView = ({ cards, setCards, isLoading, setIsLoading }) => {
    const param = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        if (!param?.category_id) {
            navigate('/category/64e64b584e28034a6064ec41')
        }
    }, [])

    useEffect(() => {
        setIsLoading(true)
        setCards([])
    }, [param?.category_id])

    useEffect(() => {
        if (param?.category_id) {
            axios.get(`http://localhost:5000/get-card/${param?.category_id}`)
                .then(response => {
                    setCards(response.data);
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setCards(cards);
            setIsLoading(false)
        }
    }, [param?.category_id])

    return (
        <div className='mb-10'>
            <div className='flex justify-center'>
                <CardOption></CardOption>
            </div>
            <div className={(!isLoading && cards?.length <= 0) ? 'flex justify-center mt-52' : 'hidden'}>
                <p className='text-xl font-semibold text-gray-500'>No Data Found</p>
            </div>
            <div className='lg:mx-20 md:mx-10 mt-6 grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-x-6 gap-y-10 overflow-x-hidden lg:mb-20 md:mb-28 place-items-center'>
                {cards?.map((card, index) =>
                    <Card key={index} data={card}></Card>
                )}
                {isLoading && Array.apply(null, { length: 20 }).map((e, i) => (
                    <div className='-z-50' key={i}>
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-xl bg-slate-200 w-[318px] h-[304px]"></div>
                        </div>
                        <div className='space-y-1 mt-3'>
                            <div className='space-y-[3px]'>
                                <div className='mt-2 flex items-center justify-between w-[318px]'>
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded bg-slate-200 w-40 h-4"></div>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="rounded bg-slate-200 w-10 h-4"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='space-y-[3px]'>
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded bg-slate-200 w-32 h-4"></div>
                                    </div>
                                    <div className="animate-pulse flex mt-[10px]">
                                        <div className="rounded bg-slate-200 w-24 h-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="animate-pulse flex mt-[10px]">
                                    <div className="rounded bg-slate-200 w-20 h-5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default CardView;