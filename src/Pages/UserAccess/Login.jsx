import React from "react";
import { useForm } from "react-hook-form";
import { GiBookshelf } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const naviagte = useNavigate();
  const { loginUser, loginSocialUser } = useAuth();
  const handleLogin = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
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
          <span className="text-2xl md:text-3xl font-bold">W</span>elcome back to your personal reading space. 
          By logging in, you gain access to your book orders, delivery updates, and a carefully curated collection.
          <br className="hidden md:block" />
          At BookCourier, we make sure your journey with books remains smooth, secure, and inspiring every step.
        </p>
      </div>
    </div>
  </div>
  <div className="w-full lg:w-5/12 flex items-center justify-center p-6 bg-base-100">
    <div className="w-full max-w-md">
      <Link to="/" className="flex items-center gap-2 mb-4 text-gray-700 dark:text-white">
        <IoMdArrowRoundBack className="text-xl" />
        <span>Back to home</span>
      </Link>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-lg border p-4">
          <legend className="fieldset-legend text-xl font-semibold">Login</legend>

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && <p className="text-red-400">Enter your email.</p>}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && <p className="text-red-400">Enter your password.</p>}

          <button className="btn btn-primary w-full mt-2">Login</button>

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
            Login with Google
          </button>

          <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link to="/user-access/register" className="text-red-400 font-bold underline">
              Create an account
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
