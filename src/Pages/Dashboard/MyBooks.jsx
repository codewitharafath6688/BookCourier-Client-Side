import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { LiaBabyCarriageSolid } from "react-icons/lia";

const MyBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { user } = useAuth();
  const librarianModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { data: addBooks = [], refetch } = useQuery({
    queryKey: ["addbooks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/add-book?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleModal = (book) => {
    setSelectedBook(book);
    reset({
      bookName: book.bookName,
      bookImageUrl: book.bookImageUrl,
      authorName: book.authorName,
      price: book.price,
      librarianEmail: book.librarianEmail,
      bookStatus: book.bookStatus,
    });
    librarianModalRef.current.showModal();
  };
  const closeModal = () => {
    if (librarianModalRef.current) {
      librarianModalRef.current.close();
    }
  };
  const handleUpdateBook = (data) => {
    axiosSecure.patch(`/add-book/${selectedBook._id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Successfully updated",
          icon: "success",
          draggable: true,
        });
        closeModal();
        refetch();
      }
    });
  };
  return (
    <div className="w-full p-3 sm:p-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">
        Books
        <span className="badge badge-primary ml-2">{addBooks.length}</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm sm:table-md min-w-[700px]">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Book Image</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {addBooks.map((book, i) => (
              <tr key={book._id}>
                <th>{i + 1}</th>

                <td className="whitespace-nowrap font-medium">
                  {book.bookName}
                </td>

                <td className="whitespace-nowrap">{book.authorName}</td>

                <td>
                  <img
                    src={book.bookImageUrl}
                    alt="book"
                    className="w-10 h-12 sm:w-12 sm:h-14 object-cover rounded"
                  />
                </td>

                <td className="whitespace-nowrap">
                  <span className="font-medium">{book.bookStatus}</span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => handleModal(book)}
                    className="btn btn-xs sm:btn-sm btn-outline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={librarianModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-2">Edit your book</h3>

          <form onSubmit={handleSubmit(handleUpdateBook)} className="space-y-2">
            <div>
              <label className="label text-sm">Book Name</label>
              <input
                type="text"
                {...register("bookName")}
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            <div>
              <label className="label text-sm">Book Image URL</label>
              <input
                type="text"
                {...register("bookImageUrl")}
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            <div>
              <label className="label text-sm">Author Name</label>
              <input
                type="text"
                {...register("authorName")}
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            <div>
              <label className="label text-sm">Price</label>
              <input
                type="text"
                {...register("price")}
                className="input input-bordered input-sm w-full"
                required
              />
            </div>

            <div>
              <label className="label text-sm">Librarian Email</label>
              <input
                type="text"
                {...register("librarianEmail")}
                className="input input-bordered input-sm w-full"
                readOnly
              />
            </div>

            <div>
              <label className="label text-sm">Status</label>
              <select
                {...register("bookStatus")}
                className="select select-bordered select-sm w-full"
                required
              >
                <option value="" disabled>
                  Select your status
                </option>
                <option value="pending">pending approval</option>
                <option value="unpublished">unpublished</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm btn-ghost"
              >
                Close
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      
<div className="text-center text-xs text-gray-400 py-2 md:hidden">
  ← Swipe horizontally to view more →
</div>
    </div>
  );
};

export default MyBooks;
