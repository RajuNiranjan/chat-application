import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthFailure,
  AuthStart,
  AuthSuccess,
} from "../redux/Actions/user.action";
import axios from "axios";

interface LogInProps {
  email: string;
  password: string;
}

const LogIn = () => {
  const [logInForm, setLogInForm] = useState<LogInProps>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogInForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(AuthStart());

    try {
      const res = await axios.post("/api/auth/login", logInForm);
      const data = res.data;
      dispatch(AuthSuccess(data));
      console.log(data);
      // navigate("/");
      setLogInForm({ email: "", password: "" });
    } catch (error) {
      console.log(error);

      // dispatch(AuthFailure(error));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={onSubmitLoginForm}
        className="w-[450px] flex flex-col gap-4 bg-white p-4 shadow-lg rounded-lg"
      >
        <h1 className="text-center text-xl font-bold">Log In</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-3 border focus:outline-none rounded-lg"
            value={logInForm.email}
            onChange={onChangeInputText}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-3 border focus:outline-none rounded-lg"
            value={logInForm.password}
            onChange={onChangeInputText}
            required
          />
        </div>

        {/* {error && <small className="text-red-500 text-center">{error}</small>} */}
        <button
          type="submit"
          className="bg-blue-500 p-3 w-full rounded-lg text-white "
        >
          {loading ? "loading..." : "Login"}
        </button>

        <small className="text-center">
          Don't have an account ?{" "}
          <Link to="/register" className="text-blue-500">
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default LogIn;
