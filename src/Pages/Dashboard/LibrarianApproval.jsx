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
    <div className="p-3 sm:p-4 md:p-6">
      <h2 className="text-lg md:text-2xl font-semibold mb-4">
        Approval Of Librarians
        <span className="badge badge-primary ml-2">{librarians.length}</span>
      </h2>

      <div className="card bg-base-100 shadow-md">
        <div className="overflow-x-auto">
          <table className="table table-zebra table-sm md:table-md min-w-[900px]">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {librarians.map((librarian, i) => (
                <tr key={librarian._id}>
                  <th>{i + 1}</th>

                  <td className="font-medium whitespace-nowrap">
                    {librarian.name}
                  </td>

                  <td className="break-all max-w-[260px]">{librarian.email}</td>

                  <td className="whitespace-nowrap">{librarian.district}</td>

                  <td className="whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        librarian.status === "approved"
                          ? "text-green-500"
                          : librarian.status === "rejected"
                          ? "text-red-500"
                          : "text-warning"
                      }`}
                    >
                      {librarian.status}
                    </span>
                  </td>

                  <td className="text-center whitespace-nowrap space-x-1">
                    <button
                      className="btn btn-xs btn-outline btn-success"
                      onClick={() => handleAddStatus(librarian)}
                    >
                      <HiUserAdd size={16} />
                    </button>

                    <button
                      onClick={() => handleRemoveStatus(librarian)}
                      className="btn btn-xs btn-outline btn-warning"
                    >
                      <HiUserRemove size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(librarian)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      <MdOutlineDeleteOutline size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile hint */}
          <div className="text-center text-xs text-gray-400 py-2 md:hidden">
            ← Swipe horizontally to view more →
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianApproval;
