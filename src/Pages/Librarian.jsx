import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Librarian = () => {
  const { register, control, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const librarianRegion = useWatch({ control, name: "region" });
  const handleLibrarian = (data) => {
    console.log(data);
    axiosSecure
      .post("/librarians", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Your application has been saved",
            icon: "success",
            draggable: true,
          });
          reset();
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            title: "Email already exists",
            text: "This email is already used for a librarian application",
            icon: "error",
          });
          reset();
        }
      });
  };
  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Be A Librarian
          </h2>

          <form onSubmit={handleSubmit(handleLibrarian)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Section: Librarian Info */}
              <div className="lg:col-span-2">
                <h4 className="text-xl font-semibold border-b pb-2 mb-4">
                  Librarian Information
                </h4>
              </div>

              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="text"
                  {...register("email")}
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="label">Region</label>
                <select
                  {...register("region")}
                  defaultValue="Pick a region"
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">District</label>
                <select
                  {...register("district")}
                  defaultValue="Pick a district"
                  className="select select-bordered w-full"
                  required
                >
                  <option disabled>Pick a district</option>
                  {districtsByRegion(librarianRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  className="input input-bordered w-full"
                  placeholder="Your Address"
                  required
                />
              </div>

              {/* Section: Education */}
              <div className="lg:col-span-2 mt-4">
                <h4 className="text-xl font-semibold border-b pb-2 mb-4">
                  Education Details
                </h4>
              </div>

              <div>
                <label className="label">Highest Education Level</label>
                <input
                  type="text"
                  {...register("level")}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Degree / Subject</label>
                <input
                  type="text"
                  {...register("degree")}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Year of Graduation</label>
                <input
                  type="number"
                  {...register("year")}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">NID</label>
                <input
                  type="text"
                  {...register("nid")}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-8">
              <button className="btn btn-primary px-12">
                Apply as a Librarian
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Librarian;
