import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2>Payment is cancelled. Please try again.</h2>
            <Link to='/dashboard/my-orders' className='btn'>Try again</Link>
        </div>
    );
};

export default PaymentCancel;