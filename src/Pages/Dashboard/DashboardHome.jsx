import React from 'react';
import useRole from '../../Hooks/useRole';
import AdminDashboard from './AdminDashboard';
import LibrarianDashboard from './LibrarianDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const {isLoading, role} = useRole();
    if(isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>;
    }
    if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    } else if (role === 'librarian'){
        return <LibrarianDashboard></LibrarianDashboard>
    } else {
        return <UserDashboard></UserDashboard>
    }
};

export default DashboardHome;