import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdAdminPanelSettings, MdOutlineDeleteOutline } from "react-icons/md";
import { BsFillShieldSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const Management = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleAddAdmin = (user) => {
    const updateRole = {
      role: "admin",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Give admin role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, updateRole).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Done!",
              text: `${user.displayName} added role as an admin`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const updateRole = {
      role: "user",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Remove admin role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}`, updateRole).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Done!",
              text: `${user.displayName} removed from admin role`,
              icon: "success",
            });
            refetch();
          }
        });
      }
      refetch();
    });
  };
  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/user-delete/${userId}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Done!",
              text: `Successfully deleted a user`,
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };
  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h2 className="text-lg md:text-2xl font-semibold mb-4">
        Users
        <span className="badge badge-primary ml-2">{users.length}</span>
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
                <th>User Role</th>
                <th className="text-center">Admin Action</th>
                <th className="text-center">Other Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>

                  <td className="font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.photoURL} alt="Avatar" />
                        </div>
                      </div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </td>

                  <td className="break-all max-w-[260px]">{user.email}</td>
                  <td className="whitespace-nowrap">{user.role}</td>

                  <td className="text-center whitespace-nowrap">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-xs btn-outline btn-warning"
                      >
                        <BsFillShieldSlashFill size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddAdmin(user)}
                        className="btn btn-xs btn-outline btn-success"
                      >
                        <MdAdminPanelSettings size={16} />
                      </button>
                    )}
                  </td>

                  <td className="text-center whitespace-nowrap space-x-1">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
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

export default Management;
