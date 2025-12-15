import React from "react";
import { useForm } from "react-hook-form";
import { GiBookshelf } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSignUp = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full flex justify-between items-center">
      <div
        className="h-screen  bg-cover bg-center w-[55%]"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/WWf4hrpL/image.png)",
        }}
      >
        <div className="bg-black/55 h-full w-full">
          <div className="flex p-3">
            <Link to="/" className="flex gap-2 items-center justify-center">
              <GiBookshelf className="text-xl text-red-500" />
              <h2 className="text-2xl">BookCourier</h2>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-[18px] mt-50 font-serif p-4">
              <span className="text-3xl">W</span>elcome back to your personal
              reading space. By logging in, you gain access to your book orders,
              delivery updates, and a carefully curated collection designed{" "}
              <br /> for readers who value knowledge, stories, and seamless
              service. <br />
              <br /> At BookCourier, we make sure your journey with books
              remains smooth, secure, and inspiring every step of the way.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[35%]">
        <div className="font-semibold w-34">
          <Link to="/" className="flex gap-2">
            <IoMdArrowRoundBack className="text-xl mb-4" />{" "}
            <span>Back to home</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-xl">SignUp</legend>

            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-300">Name is required.</p>
            )}

            <label className="label">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              className="input"
              placeholder="Photo URL"
            />
            {errors.photoURL?.type === "required" && (
              <p className="text-red-300">Photo URL is required.</p>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-300">Email is required.</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-300">Password is required.</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-300">
                Minimum 6 characters with uppercase, lowercase and special
                symbol
              </p>
            )}

            <button className="btn btn-neutral mt-4">SignUp</button>
            <button className="btn mt-3 bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Continue with Google
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                to="/user-access/login"
                className="text-red-300 font-bold underline"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
