import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/librarins/orders?email=${user.email}`
      );
      return res.data;
    },
  });
  const handleStatusChange = (id, status) => {
    const update = {
      deliveryStatus: status,
    };
    axiosSecure.patch(`/orders/${id}/status`, update).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleCancel = (id) => {
    const update = {
      deliveryStatus: "cancelled (refund)",
    };
    axiosSecure.patch(`/orders/${id}/status`, update).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleRemove = (orderId) => {
    axiosSecure
      .patch(`/librarians/user-order-remove/${orderId}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Successfully removed",
          icon: "success",
          draggable: true,
        });
        refetch();
      });
  };
  const visibleOrders = orders.filter(
    (order) => order.librarianOrderStatus !== "deleted"
  );
  console.log(visibleOrders);
  return (
    <div>
      <h2 className="text-xl font-semibold ml-2 mt-2 mb-2">
        Librarian Orders: <span className="badge badge-primary ml-2">{visibleOrders.length}</span>
      </h2>

      <div className="overflow-x-auto w-full  rounded">
        <table className="table table-zebra w-full min-w-[700px]">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>User Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map(
              (order, i) =>(
                  <tr key={order._id}>
                    <th>{i + 1}</th>
                    <td>{order.bookName}</td>
                    <td>{order.userEmail}</td>
                    <td>{order.deliveryStatus}</td>
                    <td>
                      <select
                        className="bg-black text-white"
                        value={order.deliveryStatus}
                        disabled={
                          order.deliveryStatus === "cancelled (refund)" ||
                          order.deliveryStatus === "delivered"
                        }
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="text-center whitespace-nowrap space-x-1">
                      {(order.deliveryStatus === "pending" ||
                        order.deliveryStatus === "awaiting_pickup") && (
                        <button
                          className="btn btn-sm"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleRemove(order._id)}
                        className="btn btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-sm text-gray-500 italic text-center sm:hidden">
        ← Swipe horizontally to view more →
      </p>
    </div>
  );
};

export default Orders;
