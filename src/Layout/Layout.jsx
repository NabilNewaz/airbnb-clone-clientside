import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Categories from '../Components/Categories';
import CardView from '../Components/CardView';
import { useScrollYPosition } from 'react-use-scroll-position';
import Footer from '../Components/Footer';


const Layout = () => {
    const scrollY = useScrollYPosition();
    const [isBackdrop, setIsBackdrop] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="mx-auto">
            {isBackdrop && <div onClick={() => setIsBackdrop(!isBackdrop)} className='bg-black h-screen fixed top-0 w-full z-20 opacity-30'></div>}
            <div className={`md:border-b sticky top-0 ${modalOpen ? 'z-10' : 'z-20'}`}>
                <Navbar isBackdrop={isBackdrop} setIsBackdrop={setIsBackdrop} modalOpen={modalOpen} setModalOpen={setModalOpen} cards={cards} setCards={setCards} isLoading={isLoading} setIsLoading={setIsLoading} ></Navbar>
            </div>
            <div className={isBackdrop ? 'fixed top-0' : "sticky z-10 top-[82px] bg-white"}>
                <div className={scrollY > 5 ? 'sticky top-[82px] z-10 bg-white shadow-md' : 'sticky top-[82px] bg-white shadow-md md:shadow-none'}>
                    <Categories modalOpen={modalOpen} setModalOpen={setModalOpen} cards={cards} setCards={setCards}></Categories>
                </div>
            </div>
            <div>
                <CardView cards={cards} setCards={setCards} isLoading={isLoading} setIsLoading={setIsLoading} ></CardView>
            </div>
            <div className={`border-t fixed bottom-0 w-full bg-white ${(scrollY >= 150) ? 'hidden md:block' : ''}`}>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Layout;