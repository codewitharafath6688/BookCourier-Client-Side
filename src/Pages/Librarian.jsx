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
    <div className="w-250 mx-auto mt-2">
      <h2 className="text-4xl mb-2 font-bold">Be A Librarian</h2>
      <form onSubmit={handleSubmit(handleLibrarian)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* librarian Details */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Librarian Details</h4>
            {/* librarian name */}
            <label className="label">librarian Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="librarian Name"
              readOnly
            />

            {/* librarian email */}
            <label className="label">Email</label>
            <input
              type="text"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="librarian Email"
              readOnly
            />

            {/* librarian region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regions</legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="select"
                required
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* librarian districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Districts</legend>
              <select
                {...register("district")}
                defaultValue="Pick a district"
                className="select"
                required
              >
                <option disabled={true}>Pick a district</option>
                {districtsByRegion(librarianRegion).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* librarian address */}
            <label className="label mt-4">Your Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="librarian Address"
              required
            />
          </fieldset>
          {/* librarian more Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">More Details</h4>
            {/* librarian education level */}
            <label className="label">Highest Education Level</label>
            <input
              type="text"
              {...register("level")}
              className="input w-full"
              placeholder="Highest Education Level"
              required
            />
            {/* librarian degree/subject */}
            <label className="label">Degree/Subject</label>
            <input
              type="text"
              {...register("degree")}
              className="input w-full"
              placeholder="Degree/Subject"
              required
            />
            {/* librarian passing year */}
            <label className="label">Year of Graduation</label>
            <input
              type="number"
              {...register("year")}
              className="input w-full"
              placeholder="Year of Graduation"
              required
            />

            {/* librarian NID */}
            <label className="label">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
              required
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn  mt-3"
          value="Apply as a librarian"
        />
      </form>
    </div>
  );
};

export default Librarian;
