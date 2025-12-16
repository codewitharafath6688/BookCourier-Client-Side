import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const AddBook = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const handleAddBook = (data) => {
    console.log(data);
  }
  return (
    <div className="w-100 mt-1 mx-auto">
      <h2 className="text-2xl font-bold mb-1">Add your book</h2>
      <form onSubmit={handleSubmit(handleAddBook)} className="w-100">
        <fieldset className="fieldset w-100 bg-base-200 border-none rounded-box  border p-4">
          <legend className="fieldset-legend">Add details about book</legend>

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
            defaultValue={user?.email}
            className="input w-full"
            placeholder="Librarian Email"
            readOnly
          />

          <label className="select mt-2">
            <span className="label">Status</span>
            <select {...register("bookStatus")}
            defaultValue=""
            >
              <option value="" disabled>Select your status</option>
              <option value="published">published</option>
              <option value="unpublished">unpublished</option>
            </select>
          </label>
          <button className="btn border-2 rounded-2xl mt-2 border-white">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddBook;
