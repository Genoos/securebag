import React, { useContext, useRef, useState } from "react";

import AuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleFormSubmit(e) {
    e.preventDefault();

    let email = emailRef.current.value;
    let passwd = passwordRef.current.value;
    

    try {
      setLoading(true);
      setError("");

      await login(email, passwd);
      console.log("called login");
      navigate("/home")
    } catch(err) {
      console.log("error", err);
      setError("Failed to Login");
    }
  }
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div className="h-screen flex bg-gray-bg1">
         

          <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
            <p class="flex items-center mb-6 text-2xl pl-14 font-semibold text-gray-900 dark:text-blue-700">
              <img
                class="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Secure Vault
            </p>
            <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
              Log in to your account 🔐
            </h1>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="w-full bg-blue-200 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  id="email"
                  placeholder="Your Email"
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="w-full bg-blue-200 p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                  id="password"
                  placeholder="Your Password"
                  ref={passwordRef}
                />
              </div>

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div className="flex justify-center items-center mt-6">
                <button
                  type="submit"
                  class="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Login
                </button>
              </div>
              <div className="flex justify-center items-center mt-6">
                <p class="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <Link
                    to="/register"
                    class="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
