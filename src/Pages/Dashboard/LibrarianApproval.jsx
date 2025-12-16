import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const LibrarianApproval = () => {
  const axiosSecure = useAxiosSecure();
  const { data: librarians = [], refetch } = useQuery({
    queryKey: ["librarians", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarians");
      return res.data;
    },
  });
  const updateStatus = (librarian, status) => {
    console.log(librarian._id);
    const update = {
      status: status,
    };
    axiosSecure.patch(`/librarians/${librarian._id}`, update).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Successfully ${status} as a librarian`,
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    });
  };
  const handleAddStatus = (librarian) => {
    updateStatus(librarian, "approved");
  };
  const handleRemoveStatus = (librarian) => {
    updateStatus(librarian, "rejected");
  };
  const handleDelete = (librarian) => {
    axiosSecure.delete(`/librarians/${librarian._id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully deleted",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <h2>Approval Of Librarians : {librarians.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {librarians.map((librarian, i) => (
              <tr key={librarian._id}>
                <th>{i + 1}</th>
                <td>{librarian.name}</td>
                <td>{librarian.email}</td>
                <td>{librarian.district}</td>
                <td>
                  <p
                    className={`${
                      librarian.status === "approved"
                        ? "text-green-500"
                        : librarian.status === "rejected"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {librarian.status}
                  </p>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleAddStatus(librarian)}
                  >
                    <HiUserAdd />
                  </button>
                  <button
                    onClick={() => handleRemoveStatus(librarian)}
                    className="btn ml-2"
                  >
                    <HiUserRemove />
                  </button>
                  <button
                    onClick={() => handleDelete(librarian)}
                    className="btn ml-2"
                  >
                    <MdOutlineDeleteOutline />
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

export default LibrarianApproval;
