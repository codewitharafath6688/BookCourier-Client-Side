import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  MdOutlineDeleteOutline,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [], refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarian-books");
      return res.data;
    },
  });
  const handleUpdateStatus = (book, status) => {
    const updateBookInfo = {
      bookStatus: status,
    };
    axiosSecure
      .patch(`/librarian-books/${book._id}/status`, updateBookInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: `Successfully ${status}`,
            icon: "success",
            draggable: true,
          });
          refetch();
        }
      });
  };
  const handlePublished = (book) => {
    handleUpdateStatus(book, "published");
  };
  const handleUnpublished = (book) => {
    handleUpdateStatus(book, "unpublished");
  };
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">
        Manage Books ({books.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full min-w-225">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Author</th>
              <th>Image</th>
              <th>Status</th>
              <th>Price</th>
              <th className="hidden md:table-cell">Librarian Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, i) => (
              <tr key={book._id}>
                <th>{i + 1}</th>

                <td>{book.bookName}</td>
                <td>{book.authorName}</td>

                <td>
                  <img
                    src={book.bookImageUrl}
                    alt="book"
                    className="w-14 h-12 object-cover rounded"
                  />
                </td>

                <td>
                  <span
                    className={`badge ${
                      book.bookStatus === "published"
                        ? "badge-success"
                        : book.bookStatus === "unpublished"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {book.bookStatus}
                  </span>
                </td>

                <td>${book.price}</td>

                <td className="hidden md:table-cell">{book.librarianEmail}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => handlePublished(book)}
                    className="btn btn-xs btn-success tooltip"
                    data-tip="Publish"
                  >
                    <MdOutlinePublishedWithChanges size={18} />
                  </button>

                  <button
                    onClick={() => handleUnpublished(book)}
                    className="btn btn-xs btn-warning tooltip"
                    data-tip="Unpublish"
                  >
                    <MdOutlineUnpublished size={18} />
                  </button>

                  <button
                    className="btn btn-xs btn-error tooltip"
                    data-tip="Delete"
                  >
                    <MdOutlineDeleteOutline size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
