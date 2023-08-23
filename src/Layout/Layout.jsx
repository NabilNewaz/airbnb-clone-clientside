import React from 'react';
import Navbar from '../Components/Navbar';
import Categories from '../Components/Categories';
import CardView from '../Components/CardView';

const Layout = () => {
    return (
        <div className="mx-auto">
            <div className="border-b">
                <Navbar></Navbar>
            </div>
            <div>
                <Categories></Categories>
            </div>
            <div>
                <CardView></CardView>
            </div>
        </div>
    );
};

export default Layout;