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
          photoURL: result.user.photoURL,
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT IMAGE SECTION */}
      <div
        className="hidden lg:flex lg:w-[55%] flex-1 bg-cover bg-center relative"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/WWf4hrpL/image.png)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55 flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <Link to="/" className="flex gap-2 items-center">
              <GiBookshelf className="text-xl text-red-500" />
              <h2 className="text-2xl text-white font-bold">BookCourier</h2>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="flex-1 flex items-center justify-center px-6">
            <p className="text-white text-base lg:text-lg font-serif text-center leading-relaxed">
              <span className="text-3xl">W</span>elcome back to your personal
              reading space. By logging in, you gain access to your book orders,
              delivery updates, and a carefully curated collection designed for
              readers who value knowledge, stories, and seamless service.
              <br />
              <br />
              At BookCourier, we make sure your journey with books remains
              smooth, secure, and inspiring every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div className="flex w-full lg:w-[45%] flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex gap-2 items-center mb-4">
            <IoMdArrowRoundBack className="text-xl" />
            <span>Back to home</span>
          </Link>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-lg border p-6">
              <legend className="text-xl font-semibold">Login</legend>

              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-300">Enter your email.</p>
              )}

              <label className="label mt-2">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-300">Enter your password.</p>
              )}

              <button className="btn btn-neutral w-full mt-4">Login</button>

              <button
                onClick={handleGoogleLogin}
                type="button"
                className="btn w-full mt-3 bg-white text-black border flex items-center justify-center gap-2"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff" />
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    />
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    />
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    />
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    />
                  </g>
                </svg>
                Login with Google
              </button>

              <p className="text-center mt-4 text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/user-access/register"
                  state={location.state}
                  className="text-red-400 font-bold underline"
                >
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
