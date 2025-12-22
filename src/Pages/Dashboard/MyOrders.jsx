import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import MyBooks from "./MyBooks";
import { Link } from "react-router";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { data: myOrders = [], refetch } = useQuery({
    queryKey: ["myOrders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });
  const handlePay = async (order) => {
    const paymentInfo = {
      price: order.price,
      bookName: order.bookName,
      orderId: order._id,
      email: order.email,
      bookImage: order.bookImageUrl,
      deliveryStatus: "pending",
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
  };
  const handleCancelOrder = (orderId) => {
    axiosSecure.patch(`/user/order-cancel/${orderId}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Successfully order cancelled",
        icon: "success",
        draggable: true,
      });
      refetch();
    });
  };
  const handleDelete = (orderId) => {
    axiosSecure.patch(`/user/order-deleted/${orderId}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Successfully deleted",
        icon: "success",
        draggable: true,
      });
      refetch();
    });
  };
  const visibleOrders = myOrders.filter(
    (order) => order.userOrderStatus !== "deleted"
  );
  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h2 className="text-lg md:text-2xl font-semibold">
          My Orders
          <span className="badge badge-primary ml-2">
            {visibleOrders.length}
          </span>
        </h2>
      </div>
      <div className="card bg-base-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm md:table-md min-w-[800px]">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleOrders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>

                  <td className="font-medium max-w-[220px] truncate">
                    {order.bookName}
                  </td>

                  <td className="font-semibold whitespace-nowrap">
                    ${order.price}
                  </td>
                  <td className="whitespace-nowrap">
                    {order.paymentStatus === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <button
                        disabled={
                          order.deliveryStatus === "cancelled (yourself)"
                        }
                        onClick={() => handlePay(order)}
                        className="btn btn-xs btn-primary"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="whitespace-nowrap">
                    <span
                      className={`badge ${
                        order.deliveryStatus === "pending"
                          ? "badge-warning"
                          : order.deliveryStatus.includes("cancelled")
                          ? "badge-error"
                          : "badge-info"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="text-center whitespace-nowrap space-x-1">
                    {order.deliveryStatus === "pending" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="btn btn-xs btn-outline btn-warning"
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <MdOutlineDeleteOutline size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center text-xs text-gray-400 py-2 md:hidden">
            ← Swipe horizontally to view more →
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
