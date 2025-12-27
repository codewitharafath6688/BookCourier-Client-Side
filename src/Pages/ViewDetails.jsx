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
    <div className="my-1">
      {/* HERO SECTION */}
      <div className="hero bg-base-200 min-h-screen px-2 sm:px-6">
        <div className="hero-content w-full flex-col lg:flex-row gap-6 lg:gap-10">
          {/* IMAGE */}
          <img
            src={book?.bookImageUrl}
            alt={book?.bookName}
            className="
          w-full 
          lg:w-1/2 
          max-h-[350px] sm:max-h-[450px] lg:max-h-[520px]
          object-contain 
          rounded-lg 
          shadow-2xl
        "
          />

          {/* CONTENT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-xl sm:text-3xl lg:text-5xl font-bold">
              {book?.bookName}
            </h1>

            <p className="mt-2 sm:mt-4 text-sm sm:text-lg lg:text-xl">
              {book?.authorName}
            </p>

            <p className="mt-2 text-sm sm:text-base">
              <span className="font-semibold">Price:</span> ${book?.price}
            </p>

            <p className="mt-1 text-xs sm:text-sm">
              <span className="font-semibold">Publish Date:</span>{" "}
              {new Date(book?.createdAt).toLocaleDateString()}
            </p>

            <button
              onClick={() => handleBuy(book)}
              className="
            btn btn-primary 
            btn-sm sm:btn-md 
            mt-4
          "
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <dialog
        ref={buyRefModal}
        className="modal modal-bottom sm:modal-middle px-2"
      >
        <div className="modal-box w-full max-w-xs sm:max-w-md p-3 sm:p-6">
          <p className="py-2 text-xs sm:text-lg text-center">
            Fill up this to get this book.
          </p>

          <div className="modal-action justify-center">
            <form onSubmit={handleSubmit(handleGetBook)} className="w-full">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-3 sm:p-4 text-xs sm:text-sm">
                <legend className="fieldset-legend text-xs sm:text-sm">
                  Place Order
                </legend>

                <label className="label text-xs sm:text-sm">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={user?.displayName}
                  className="input input-sm sm:input-md w-full"
                  readOnly
                />

                <label className="label text-xs sm:text-sm">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={user?.email}
                  className="input input-sm sm:input-md w-full"
                  readOnly
                />

                <label className="label text-xs sm:text-sm">Phone Number</label>
                <input
                  type="number"
                  {...register("phoneNumber")}
                  className="input input-sm sm:input-md w-full"
                  placeholder="Phone Number"
                  required
                />

                <label className="label text-xs sm:text-sm">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="input input-sm sm:input-md w-full"
                  placeholder="Address"
                  required
                />

                <button className="btn btn-neutral btn-sm sm:btn-md mt-3 w-full">
                  Place Your Order
                </button>
              </fieldset>

              <button
                onClick={handleClose}
                type="button"
                className="btn btn-sm sm:btn-md mt-3 w-full"
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
