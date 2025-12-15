import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../../Layout/Navber';

const UserAccess = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default UserAccess;