import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const EditProfile = () => {
  const { updateUserProfile, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { handleSubmit, register, reset } = useForm();
  const handleEdit = async (data) => {

  await updateUserProfile({
    displayName: data.displayName,
    photoURL: data.photoURL,
  });

  const res = await axiosSecure.patch("/user/profile", {
    email: user?.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
  });

  reset({
    displayName: data.displayName,
    photoURL: data.photoURL,
  });

  Swal.fire({
    icon: "success",
    title: "Profile updated",
  });

  return res.data;
};

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4">
  <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
  <form onSubmit={handleSubmit(handleEdit)} className="space-y-4">
    <fieldset className="fieldset bg-base-200 border border-base-300 rounded-xl p-4">
      <legend className="fieldset-legend text-lg font-semibold">Edit your profile</legend>

      <div className="flex flex-col gap-2 mt-3">
        <label className="label text-sm font-medium">Name</label>
        <input
          type="text"
          {...register("displayName")}
          className="input w-full"
          placeholder="Enter your new name"
          required
        />
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <label className="label text-sm font-medium">Photo URL</label>
        <input
          type="text"
          {...register("photoURL")}
          className="input w-full"
          placeholder="Enter your photo url"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-neutral w-full mt-4"
      >
        Update Profile
      </button>
    </fieldset>
  </form>
</div>

  );
};

export default EditProfile;
