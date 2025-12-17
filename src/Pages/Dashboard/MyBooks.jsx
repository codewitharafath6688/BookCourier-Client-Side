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
    <div>
      <h2>Books: {addBooks.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Book Image</th>
              <th>Book Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addBooks.map((book, i) => (
              <tr key={book._id}>
                <th>{i + 1}</th>
                <td>{book.bookName}</td>
                <td>{book.authorName}</td>
                <td>
                  <img
                    className="w-15 h-12 object-cover rounded"
                    src={book.bookImageUrl}
                  />
                </td>
                <td>{book.bookStatus}</td>
                <td>
                  <button onClick={() => handleModal(book)} className="btn">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={librarianModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          <p className="py-4 text-xl">Edit your book</p>
          <div className="modal-action">
            <form onSubmit={handleSubmit(handleUpdateBook)} className="mx-auto">
              <fieldset className="fieldset w-100 bg-base-200 border-none rounded-box  border p-4">
                <legend className="fieldset-legend">
                  Add details about book
                </legend>

                <label className="label">Book Name</label>
                <input
                  type="text"
                  {...register("bookName")}
                  className="input w-full"
                  placeholder="Book Name"
                  required
                />

                <label className="label">Book Image URL</label>
                <input
                  type="text"
                  {...register("bookImageUrl")}
                  className="input w-full"
                  placeholder="Book Image URL"
                  required
                />

                <label className="label">Author Name</label>
                <input
                  type="text"
                  {...register("authorName")}
                  className="input w-full"
                  placeholder="Author Name"
                  required
                />

                <label className="label">Price</label>
                <input
                  type="text"
                  {...register("price")}
                  className="input w-full"
                  placeholder="Price"
                  required
                />

                <label className="label">Librarian Email</label>
                <input
                  type="text"
                  {...register("librarianEmail")}
                  className="input w-full"
                  placeholder="Librarian Email"
                  readOnly
                />

                <label className="select mt-2">
                  <span className="label">Status</span>
                  <select {...register("bookStatus")} required>
                    <option>
                      Select your status
                    </option>
                    <option value="pending">pending approval</option>
                    <option value="unpublished">unpublished</option>
                  </select>
                </label>
                <button type="submit" className="btn border-2 rounded-2xl mt-2 border-white">
                  Submit
                </button>
              </fieldset>
              <button
                type="button"
                onClick={() => closeModal()}
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

export default MyBooks;
