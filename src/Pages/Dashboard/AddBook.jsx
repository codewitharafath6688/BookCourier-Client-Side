import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const handleAddBook = (data) => {
    console.log(data);
    axiosSecure.post("/add-book", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Successfully Added",
          icon: "success",
          draggable: true,
        });
        reset();
      }
    });
  };
  return (
    <div className="w-full p-4 flex justify-center">
      <div className="w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-3">Add Your Book</h2>

        <div className="card bg-base-100 shadow-md">
          <form onSubmit={handleSubmit(handleAddBook)}>
            <fieldset className="bg-base-200 rounded-box p-4">
              <legend className="text-sm font-medium">
                Add details about book
              </legend>

              <div className="space-y-2">
                <div>
                  <label className="label text-sm">Book Name</label>
                  <input
                    type="text"
                    {...register("bookName")}
                    className="input input-bordered input-sm w-full"
                    placeholder="Book Name"
                    required
                  />
                </div>

                <div>
                  <label className="label text-sm">Book Image URL</label>
                  <input
                    type="text"
                    {...register("bookImageUrl")}
                    className="input input-bordered input-sm w-full"
                    placeholder="Book Image URL"
                    required
                  />
                </div>

                <div>
                  <label className="label text-sm">Author Name</label>
                  <input
                    type="text"
                    {...register("authorName")}
                    className="input input-bordered input-sm w-full"
                    placeholder="Author Name"
                    required
                  />
                </div>

                <div>
                  <label className="label text-sm">Price</label>
                  <input
                    type="text"
                    {...register("price")}
                    className="input input-bordered input-sm w-full"
                    placeholder="Price"
                    required
                  />
                </div>

                <div>
                  <label className="label text-sm">Librarian Email</label>
                  <input
                    type="text"
                    {...register("librarianEmail")}
                    defaultValue={user?.email}
                    className="input input-bordered input-sm w-full"
                    readOnly
                  />
                </div>

                <div>
                  <label className="label text-sm">Status</label>
                  <select
                    {...register("bookStatus")}
                    defaultValue=""
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

                <button
                  type="submit"
                  className="btn btn-primary btn-sm w-full mt-2"
                >
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
