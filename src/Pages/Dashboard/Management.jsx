import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdAdminPanelSettings } from "react-icons/md";
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
  return (
    <div>
      <h2>Users : {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Admin Action</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <th>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn text-xl"
                    >
                      <BsFillShieldSlashFill />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddAdmin(user)}
                      className="btn text-xl"
                    >
                      <MdAdminPanelSettings />
                    </button>
                  )}
                </th>
                <th>Actions</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Management;
