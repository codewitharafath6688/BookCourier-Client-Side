import React from "react";
import { useForm } from "react-hook-form";
import { GiBookshelf } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
// import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, loginSocialUser, updateUserProfile } = useAuth();
  const handleSignUp = (data) => {
    console.log(data);
    // const profilePhoto = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // const formData = new FormData();
        // formData.append("image", profilePhoto);
        // const imageLink = `https://api.imgbb.com/1/upload?expiration=600&key=${
        //   import.meta.env.VITE_photo_host
        // }`;
        // axios.post(imageLink, formData).then((res) => {
        // console.log(res.data.data.url);
        // post the data to back-end
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: data.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("Post to back-end");
          }
        });
        // update user profile
        const userProfile = {
          displayName: data.name,
          photoURL: data.photoURL,
        };
        updateUserProfile(userProfile)
          .then(() => console.log("User profile is updated"))
          .catch((error) => console.log(error));
        // });
        navigate(location?.state || "/");
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
          photoURL: result.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("Post to back-end");
          }
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Side / Hero */}
      <div
        className="w-full lg:w-7/12 min-h-[60vh] lg:min-h-screen h-auto bg-cover bg-center relative"
        style={{ backgroundImage: "url(https://i.ibb.co/WWf4hrpL/image.png)" }}
      >
        <div className="absolute inset-0 bg-black/55 flex flex-col justify-center items-center gap-6 p-6 text-center">
          <Link to="/" className="flex gap-2 items-center">
            <GiBookshelf className="text-[clamp(1.5rem,4vw,3rem)] text-red-500" />
            <h2 className="font-bold text-white text-[clamp(1.5rem,5vw,4rem)]">
              BookCourier
            </h2>
          </Link>

          <p className="font-serif text-white leading-relaxed max-w-lg text-[clamp(0.875rem,2.5vw,1.5rem)]">
            <span className="font-bold text-[clamp(1rem,3vw,2rem)]">W</span>
            elcome to BookCourier! Join our community to manage your orders,
            delivery updates, and access a curated collection of books.
            <br className="hidden md:block" />
            Enjoy a smooth and secure reading journey every step of the way.
          </p>
        </div>
      </div>

      {/* Right Side / SignUp Form */}
      <div className="w-full lg:w-5/12 flex items-center justify-center p-6 bg-base-100 min-h-[60vh] lg:min-h-screen">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="flex items-center gap-2 mb-6 text-orange-400 dark:text-orange-300 text-[clamp(0.875rem,2vw,1rem)]"
          >
            <IoMdArrowRoundBack className="text-[clamp(1rem,2.5vw,1.25rem)]" />
            <span>Back to home</span>
          </Link>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="space-y-4 text-[clamp(0.875rem,2vw,1rem)]"
          >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-lg border p-4">
              <legend className="fieldset-legend font-semibold text-[clamp(1rem,2.5vw,1.5rem)]">
                SignUp
              </legend>

              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full text-[clamp(0.875rem,2vw,1rem)]"
                placeholder="Name"
              />
              {errors.name && (
                <p className="text-red-400 text-[clamp(0.75rem,1.8vw,0.95rem)]">
                  Name is required.
                </p>
              )}

              <label className="label">Photo</label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                className="file-input w-full text-[clamp(0.875rem,2vw,1rem)]"
              />
              {errors.photo && (
                <p className="text-red-400 text-[clamp(0.75rem,1.8vw,0.95rem)]">
                  Photo is required.
                </p>
              )}

              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full text-[clamp(0.875rem,2vw,1rem)]"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-400 text-[clamp(0.75rem,1.8vw,0.95rem)]">
                  Email is required.
                </p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                })}
                className="input input-bordered w-full text-[clamp(0.875rem,2vw,1rem)]"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-400 text-[clamp(0.75rem,1.8vw,0.95rem)]">
                  Password is required.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-400 text-[clamp(0.75rem,1.8vw,0.95rem)]">
                  Minimum 6 characters with uppercase, lowercase, and special
                  symbol
                </p>
              )}

              <button className="btn btn-primary w-full mt-2 text-[clamp(0.875rem,2vw,1rem)]">
                SignUp
              </button>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="btn w-full mt-2 bg-white text-black border-gray-300 flex items-center justify-center gap-2 text-[clamp(0.875rem,2vw,1rem)]"
              >
                {/* Google SVG icon */}
              </button>

              <p className="text-center mt-2 text-gray-600 dark:text-gray-300 text-[clamp(0.75rem,1.8vw,0.95rem)]">
                Already have an account?{" "}
                <Link
                  to="/user-access/login"
                  className="text-red-400 font-bold underline"
                >
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
