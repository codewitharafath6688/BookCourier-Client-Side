import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const [selectedData, setSelectedData] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { id } = useParams();
  const buyRefModal = useRef();
  const axiosSecure = useAxiosSecure();
  const { data: book, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });
  console.log(book);
  const handleClose = () => {
    if (buyRefModal.current) {
      buyRefModal.current.close();
    }
  };
  const handleBuy = (book) => {
    setSelectedData(book);
    buyRefModal.current.showModal();
  };
  const handleGetBook = (data) => {
    axiosSecure.post(`/orders/${selectedData._id}`, data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Successfully placed your order.",
          icon: "success",
          draggable: true,
        });
        handleClose();
        reset();
        refetch();
      }
    });
  };
  return (
    <div className="-mt-6">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content w-full flex-col lg:flex-row gap-8">
          <img
            src={book?.bookImageUrl}
            className="w-full lg:w-1/2 h-125 object-fill  rounded-lg shadow-2xl"
          />
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold">{book?.bookName}</h1>
            <p className="my-4 text-xl">{book?.authorName}</p>
            <p> Price: ${book?.price}</p>
            <p className="mt-2">
              Publish Date: {new Date(book?.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => handleBuy(book)}
              className="btn btn-primary mt-3"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={buyRefModal} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="py-4 text-xl">Fill up this to get this book.</p>
          <div className="modal-action">
            <form
              onSubmit={handleSubmit(handleGetBook)}
              className="w-250, mx-auto"
            >
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Place Order</legend>

                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={user?.displayName}
                  className="input"
                  readOnly
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={user?.email}
                  className="input"
                  readOnly
                />

                <label className="label">Phone Number</label>
                <input
                  type="number"
                  {...register("phoneNumber")}
                  className="input"
                  placeholder="Phone Number"
                  required
                />

                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="input"
                  placeholder="Address"
                  required
                />

                <button className="btn btn-neutral mt-4">
                  Place Your Order
                </button>
              </fieldset>
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => handleClose()}
                type="button"
                className="btn mt-3"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewDetails;
