import React from 'react';
import Navber from '../Layout/Navber';
import { Outlet } from 'react-router';
import Footer from '../Layout/Footer';

const Root = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;