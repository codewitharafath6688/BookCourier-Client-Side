import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { data, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Payment = () => {
    const {bookId} = useParams();
    const axiosSecure = useAxiosSecure();
    const {data} = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${bookId}`);
            return res.data;
        }
    })
    console.log(data)
    return (
        <div>
            <h2>Pay for {data?.bookName}</h2>
        </div>
    );
};

export default Payment;