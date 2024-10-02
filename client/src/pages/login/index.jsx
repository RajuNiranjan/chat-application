import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogIn";

const LogIn = () => {
  // State to store input values
  const { loading, login } = useLogin();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full rounded-lg p-6 shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          LOGIN <span className="text-blue-500">Chat App</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName" className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <Link to="/register">
            {"Don't"} have an Account ?{" "}
            <span className="text-sm hover:underline hover:text-blue-600 mt-2">
              Register
            </span>
          </Link>
          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
