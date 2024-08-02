import axios, { AxiosError } from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthFailure,
  AuthStart,
  AuthSuccess,
} from "../redux/Actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface RegisterProp {
  userName: string;
  email: string;
  password: string;
}

const Register = () => {
  const [registerForm, setRegisterForm] = useState<RegisterProp>({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(AuthStart());

    // if (
    //   !registerForm.userName ||
    //   !registerForm.email ||
    //   !registerForm.password
    // ) {
    //   dispatch(AuthFailure("All fields are required"));
    // }

    try {
      const res = await axios.post("/api/auth/register", registerForm);
      const data = res.data;
      dispatch(AuthSuccess(data));
      console.log(data);
      navigate("/login");
      setRegisterForm({ userName: "", email: "", password: "" });
    } catch (error) {
      dispatch(AuthFailure(error));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={onSubmitLoginForm}
        className="w-[450px] flex flex-col gap-4 bg-white p-4 shadow-lg rounded-lg"
      >
        <h1 className="text-center text-xl font-bold">Register</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="p-3 border focus:outline-none rounded-lg"
            value={registerForm.userName}
            onChange={onChangeInputText}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-3 border focus:outline-none rounded-lg"
            value={registerForm.email}
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
            value={registerForm.password}
            onChange={onChangeInputText}
            required
          />
        </div>

        {/* {error && <small className="text-red-500 text-center">{error}</small>} */}
        <button
          type="submit"
          className="bg-blue-500 p-3 w-full rounded-lg text-white "
        >
          {loading ? "loading..." : "Register"}
        </button>

        <small className="text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Register;
