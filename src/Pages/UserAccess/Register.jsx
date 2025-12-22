import React from "react";
import { useForm } from "react-hook-form";
import { GiBookshelf } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const naviagte = useNavigate();
  const { createUser, loginSocialUser, updateUserProfile } = useAuth();
  const handleSignUp = (data) => {
    console.log(data);
    const profilePhoto = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        const formData = new FormData();
        formData.append("image", profilePhoto);
        const imageLink = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_photo_host
        }`;
        axios.post(imageLink, formData).then((res) => {
          console.log(res.data.data.url);
          // post the data to back-end
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoUrl: res.data.data.url,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("Post to back-end");
            }
          });
          // update user profile
          const userProfile = {
            displayName: data.name,
            photoUrl: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => console.log("User profile is updated"))
            .catch((error) => console.log(error));
        });
        naviagte(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleLogin = () => {
    loginSocialUser()
      .then((result) => {
        console.log(result.user);
        // post the data to back-end
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoUrl: result.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("Post to back-end");
          }
        });
        naviagte(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
  {/* Left Side / Hero Image */}
  <div
    className="w-full lg:w-7/12 h-64 lg:h-screen bg-cover bg-center relative"
    style={{ backgroundImage: "url(https://i.ibb.co.com/WWf4hrpL/image.png)" }}
  >
    <div className="absolute inset-0 bg-black/55 flex flex-col justify-between">
      <div className="p-4">
        <Link to="/" className="flex gap-2 items-center">
          <GiBookshelf className="text-xl text-red-500" />
          <h2 className="text-2xl font-bold text-white">BookCourier</h2>
        </Link>
      </div>
      <div className="p-4 text-white text-center">
        <p className="text-sm sm:text-base md:text-lg font-serif">
          <span className="text-2xl md:text-3xl font-bold">W</span>elcome to BookCourier! 
          Join our community to manage your orders, delivery updates, and access a curated collection of books.
          <br className="hidden md:block" />
          Enjoy a smooth and secure reading journey every step of the way.
        </p>
      </div>
    </div>
  </div>

  {/* Right Side / SignUp Form */}
  <div className="w-full lg:w-5/12 flex items-center justify-center p-6 bg-base-100">
    <div className="w-full max-w-md">
      <Link to="/" className="flex items-center gap-2 mb-4 text-gray-700 dark:text-white">
        <IoMdArrowRoundBack className="text-xl" />
        <span>Back to home</span>
      </Link>

      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-lg border p-4">
          <legend className="fieldset-legend text-xl font-semibold">SignUp</legend>

          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-400">Name is required.</p>}

          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input w-full"
          />
          {errors.photo && <p className="text-red-400">Photo is required.</p>}

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-400">Email is required.</p>}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
            })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && <p className="text-red-400">Password is required.</p>}
          {errors.password?.type === "pattern" && (
            <p className="text-red-400">
              Minimum 6 characters with uppercase, lowercase, and special symbol
            </p>
          )}

          <button className="btn btn-primary w-full mt-2">SignUp</button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn w-full mt-2 bg-white text-black border-gray-300 flex items-center justify-center gap-2"
          >
            <svg aria-label="Google logo" width="16" height="16" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/user-access/login" className="text-red-400 font-bold underline">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
</div>

  );
};

export default Register;
