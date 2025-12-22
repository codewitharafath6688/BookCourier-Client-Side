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
        console.log(res.data);
        Swal.fire({
          title: `Successfully ${status}`,
          icon: "success",
          draggable: true,
        });
        refetch();
      });
  };
  const handlePublished = (book) => {
    handleUpdateStatus(book, "published");
  };
  const handleUnpublished = (book) => {
    handleUpdateStatus(book, "unpublished");
  };
  const handleDeleteBook = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book and cancel all related orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/librarian-book/${bookId}`).then((res) => {
          console.log("after deleted", res.data);
          Swal.fire(
            "Deleted!",
            "Book has been deleted and related orders cancelled.",
            "success"
          );
          refetch();
        });
      }
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">
        Manage Books
        <span className="badge badge-primary ml-2">{books.length}</span>
      </h2>

      <div className="card bg-base-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm md:table-md min-w-[900px]">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Author</th>
                <th>Image</th>
                <th>Status</th>
                <th>Price</th>
                <th className="hidden md:table-cell">Librarian Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, i) => (
                <tr key={book._id}>
                  <th>{i + 1}</th>

                  <td className="font-medium whitespace-nowrap">
                    {book.bookName}
                  </td>

                  <td className="whitespace-nowrap">{book.authorName}</td>

                  <td className="whitespace-nowrap">
                    <img
                      src={book.bookImageUrl}
                      alt="book"
                      className="w-14 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        book.bookStatus === "published"
                          ? "text-green-500"
                          : book.bookStatus === "unpublished"
                          ? "text-red-500"
                          : "text-warning"
                      }`}
                    >
                      {book.bookStatus}
                    </span>
                  </td>

                  <td className="whitespace-nowrap">${book.price}</td>

                  <td className="hidden md:table-cell break-all max-w-[260px]">
                    {book.librarianEmail}
                  </td>

                  <td className="text-center whitespace-nowrap space-x-1">
                    <button
                      onClick={() => handlePublished(book)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      <MdOutlinePublishedWithChanges size={16} />
                    </button>

                    <button
                      onClick={() => handleUnpublished(book)}
                      className="btn btn-xs btn-outline btn-warning"
                    >
                      <MdOutlineUnpublished size={16} />
                    </button>

                    <button
                      onClick={() => handleDeleteBook(book._id)}
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

export default ManageBooks;
