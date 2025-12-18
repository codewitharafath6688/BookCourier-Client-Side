import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyBooks from "./MyBooks";
import { Link } from "react-router";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: myOrders = [] } = useQuery({
    queryKey: ["myOrders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
  return (
    <div>
      <h2>This is Order Page: {myOrders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>{order.bookName}</td>
                <td>$ {order.price}</td>
                <td>
                  {order.paymentStatus === 'paid' ? <p className="text-green-400">paid</p> : <Link className="btn" to={`/dashboard/payment/${order._id}`}>Pay</Link>}
                </td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
