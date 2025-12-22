import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["peyments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });
  const handleDelete = (paymentId) => {
    axiosSecure.delete(`/payment-history/delete/${paymentId}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        title: "Successfully deleted",
        icon: "success",
        draggable: true,
      });
      refetch();
    });
  };
  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl font-semibold">
          Invoices
          <span className="badge badge-secondary ml-2">{payments.length}</span>
        </h2>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-md">
        {/* Scroll wrapper */}
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm md:table-md min-w-[900px]">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Cost</th>
                <th>Tracking ID</th>
                <th>Transaction ID</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, i) => (
                <tr key={payment._id}>
                  <th>{i + 1}</th>

                  <td className="font-medium max-w-[200px] truncate">
                    {payment.bookName}
                  </td>

                  <td className="font-semibold whitespace-nowrap">
                    ${payment.amount}
                  </td>

                  <td>
                    <span className="badge badge-outline whitespace-nowrap">
                      {payment.trackingId}
                    </span>
                  </td>

                  <td className="break-all max-w-[260px]">
                    {payment.transactionId}
                  </td>

                  <td className="text-center whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(payment._id)}
                      className="btn btn-ghost btn-sm text-error"
                    >
                      <MdOutlineDeleteOutline size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile hint */}
          <div className="text-center text-xs text-gray-400 py-2 md:hidden">
            ← Swipe to see more →
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
